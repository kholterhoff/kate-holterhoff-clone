import { NextRequest, NextResponse } from 'next/server'
import { saveRSSData, loadRSSData, isRSSDataExpired, type RSSItem } from '@/lib/rss-storage'

export async function POST(request: NextRequest) {
  try {
    console.log('RSS Update API: Starting RSS update process')
    
    // Check if we have recent cached data
    const existingData = await loadRSSData()
    if (existingData && !isRSSDataExpired(existingData.lastUpdated, 1)) {
      console.log('RSS Update API: Using recent cached data (less than 1 hour old)')
      return NextResponse.json({
        success: true,
        data: existingData,
        message: 'Using recent cached data'
      })
    }

    console.log('RSS Update API: Fetching fresh RSS data from RSS2JSON')
    
    // Fetch fresh RSS data using RSS2JSON
    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://redmonk.com/kholterhoff/feed/')}`
    
    const response = await fetch(rss2jsonUrl, {
      headers: {
        'User-Agent': 'Kate Holterhoff Portfolio RSS Reader'
      }
    })
    
    if (!response.ok) {
      throw new Error(`RSS2JSON API returned ${response.status}`)
    }
    
    const jsonData = await response.json()
    console.log('RSS Update API: RSS2JSON response status:', jsonData.status)
    
    if (jsonData.status !== 'ok' || !jsonData.items || jsonData.items.length === 0) {
      throw new Error('Invalid RSS data received from RSS2JSON')
    }
    
    // Convert RSS2JSON format to our expected format
    const feedItems: RSSItem[] = []
    for (let i = 0; i < Math.min(jsonData.items.length, 5); i++) {
      const item = jsonData.items[i]
      
      // Extract image from content or use enclosure/thumbnail
      let imageUrl = undefined
      
      // Try to get image from enclosure first (RSS standard)
      if (item.enclosure && item.enclosure.link && item.enclosure.type?.startsWith('image/')) {
        imageUrl = item.enclosure.link
      }
      // Try thumbnail (RSS2JSON format)
      else if (item.thumbnail) {
        imageUrl = item.thumbnail
      }
      // Extract from content/description HTML
      else {
        const content = item.content || item.description || ''
        const imgMatch = content.match(/<img[^>]+src=["']([^"'>]+)["'][^>]*>/i)
        if (imgMatch && imgMatch[1]) {
          imageUrl = imgMatch[1]
        }
      }
      
      feedItems.push({
        title: item.title || '',
        link: item.link || '',
        description: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...',
        pubDate: item.pubDate || '',
        image: imageUrl,
        content: item.content || item.description
      })
    }
    
    // Save to cache
    const rssData = {
      posts: feedItems,
      lastUpdated: new Date().toISOString()
    }
    
    await saveRSSData(rssData)
    console.log('RSS Update API: Successfully updated RSS cache with', feedItems.length, 'posts')
    
    return NextResponse.json({
      success: true,
      data: rssData,
      message: `Successfully updated RSS cache with ${feedItems.length} posts`
    })
    
  } catch (error) {
    console.error('RSS Update API Error:', error)
    
    // Try to return cached data as fallback
    try {
      const fallbackData = await loadRSSData()
      if (fallbackData) {
        console.log('RSS Update API: Returning cached data as fallback')
        return NextResponse.json({
          success: true,
          data: fallbackData,
          message: 'Update failed, returning cached data'
        })
      }
    } catch (fallbackError) {
      console.error('RSS Update API: Fallback also failed:', fallbackError)
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: { posts: [], lastUpdated: '' }
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // Allow GET requests to trigger updates for testing
  return POST(request)
}
import { NextRequest, NextResponse } from 'next/server'
import { updateRSSData } from '@/lib/rss-storage'

interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
  content?: string
}

export async function GET(request: NextRequest) {
  try {
    console.log('RSS update check initiated at:', new Date().toISOString())

    // Try to fetch latest RSS data
    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://redmonk.com/kholterhoff/feed/')}`

    const response = await fetch(rss2jsonUrl)
    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`)
    }

    const jsonData = await response.json()
    console.log('RSS2JSON response status:', jsonData.status)

    if (jsonData.status === 'ok' && jsonData.items && jsonData.items.length > 0) {
      // Convert RSS2JSON format to our expected format
      const feedItems: RSSItem[] = []
      for (let i = 0; i < Math.min(jsonData.items.length, 5); i++) {
        const item = jsonData.items[i]
        feedItems.push({
          title: item.title || '',
          link: item.link || '',
          description: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...',
          pubDate: item.pubDate || '',
          content: item.content || item.description
        })
      }

      // Store the updated RSS data (we'll create a simple storage mechanism)
      const rssData = await updateRSSData(feedItems)


      console.log('Successfully fetched and processed RSS data:', {
        postCount: feedItems.length,
        latestPost: feedItems[0]?.title,
        lastUpdated: rssData.lastUpdated
      })

      return NextResponse.json({
        success: true,
        message: 'RSS data updated successfully',
        data: rssData,
        postCount: feedItems.length
      })
    }

    throw new Error('No valid RSS items found')

  } catch (error) {
    console.error('RSS update failed:', error)

    return NextResponse.json({
      success: false,
      message: 'RSS update failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  // Allow manual RSS updates via POST
  return GET(request)
}

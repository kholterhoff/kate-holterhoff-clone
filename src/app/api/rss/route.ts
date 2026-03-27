import { NextRequest, NextResponse } from 'next/server'
import { loadRSSData } from '@/lib/rss-storage'

const RSS_POST_COUNT = 6

export async function GET(request: NextRequest) {
  try {
    console.log('RSS API: Attempting to load cached RSS data')
    const cachedData = await loadRSSData()
    
    if (cachedData && cachedData.posts.length >= RSS_POST_COUNT) {
      console.log('RSS API: Serving cached data from', cachedData.lastUpdated)
      return NextResponse.json({
        success: true,
        data: cachedData
      })
    } else if (cachedData) {
      console.log('RSS API: Cached data available but below desired post count')
      return NextResponse.json({
        success: false,
        error: 'Cached RSS data needs refresh',
        data: { posts: [], lastUpdated: '' }
      })
    } else {
      console.log('RSS API: No cached data available')
      return NextResponse.json({
        success: false,
        error: 'No cached RSS data available',
        data: { posts: [], lastUpdated: '' }
      })
    }
  } catch (error) {
    console.error('RSS API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to load RSS data',
      data: { posts: [], lastUpdated: '' }
    }, { status: 500 })
  }
}

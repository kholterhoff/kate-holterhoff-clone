import { NextResponse } from 'next/server'
import { loadRSSData } from '@/lib/rss-feed'
import { RSS_POST_COUNT } from '@/lib/rss-feed-shared'

export async function GET() {
  try {
    const cachedData = await loadRSSData()

    if (cachedData && cachedData.posts.length >= RSS_POST_COUNT) {
      return NextResponse.json({
        success: true,
        data: cachedData,
      })
    }

    if (cachedData) {
      return NextResponse.json({
        success: false,
        error: 'Cached RSS data needs refresh',
        data: { posts: [], lastUpdated: '' },
      })
    }

    return NextResponse.json({
      success: false,
      error: 'No cached RSS data available',
      data: { posts: [], lastUpdated: '' },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to load RSS data',
      data: { posts: [], lastUpdated: '' },
    }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import { loadRSSData, refreshRSSData } from '@/lib/rss-feed'

export async function POST(request: NextRequest) {
  try {
    const rssData = await refreshRSSData()

    return NextResponse.json({
      success: true,
      data: rssData,
      message: `Successfully updated RSS cache with ${rssData.posts.length} posts`,
    })
  } catch (error) {
    try {
      const fallbackData = await loadRSSData()
      if (fallbackData) {
        return NextResponse.json({
          success: true,
          data: fallbackData,
          message: 'Update failed, returning cached data',
        })
      }
    } catch {
      // Ignore fallback errors and return the original failure below.
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: { posts: [], lastUpdated: '' },
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
}

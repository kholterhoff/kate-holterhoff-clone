import { NextRequest, NextResponse } from 'next/server'
import { loadMonkCastData, refreshMonkCastData } from '@/lib/monkcast-feed'

export async function POST(_request: NextRequest) {
  try {
    const forceRefresh = new URL(_request.url).searchParams.get('force') === '1'
    const monkCastData = await refreshMonkCastData(forceRefresh)

    return NextResponse.json({
      success: true,
      data: monkCastData,
      message: `Successfully updated MonkCast cache with ${monkCastData.posts.length} episodes`,
    })
  } catch (error) {
    try {
      const fallbackData = await loadMonkCastData()
      if (fallbackData) {
        return NextResponse.json({
          success: true,
          data: fallbackData,
          message: 'Update failed, returning cached MonkCast data',
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

import { NextResponse } from 'next/server'
import { loadMonkCastData, MONKCAST_POST_COUNT } from '@/lib/monkcast-feed'

export async function GET() {
  try {
    const cachedData = await loadMonkCastData()

    if (cachedData && cachedData.posts.length >= MONKCAST_POST_COUNT) {
      return NextResponse.json({
        success: true,
        data: cachedData,
      })
    }

    if (cachedData) {
      return NextResponse.json({
        success: false,
        error: 'Cached MonkCast data needs refresh',
        data: { posts: [], lastUpdated: '' },
      })
    }

    return NextResponse.json({
      success: false,
      error: 'No cached MonkCast data available',
      data: { posts: [], lastUpdated: '' },
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to load MonkCast data',
      data: { posts: [], lastUpdated: '' },
    }, { status: 500 })
  }
}

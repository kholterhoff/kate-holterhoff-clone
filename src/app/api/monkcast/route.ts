import { NextResponse } from 'next/server'
import { loadMonkCastData } from '@/lib/monkcast-storage'

const MONKCAST_POST_COUNT = 6

export async function GET() {
  try {
    console.log('MonkCast API: Attempting to load cached podcast data')
    const cachedData = await loadMonkCastData()

    if (cachedData && cachedData.posts.length >= MONKCAST_POST_COUNT) {
      console.log('MonkCast API: Serving cached data from', cachedData.lastUpdated)
      return NextResponse.json({
        success: true,
        data: cachedData
      })
    }

    if (cachedData) {
      console.log('MonkCast API: Cached data available but below desired episode count')
      return NextResponse.json({
        success: false,
        error: 'Cached MonkCast data needs refresh',
        data: { posts: [], lastUpdated: '' }
      })
    }

    console.log('MonkCast API: No cached data available')
    return NextResponse.json({
      success: false,
      error: 'No cached MonkCast data available',
      data: { posts: [], lastUpdated: '' }
    })
  } catch (error) {
    console.error('MonkCast API Error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to load MonkCast data',
      data: { posts: [], lastUpdated: '' }
    }, { status: 500 })
  }
}

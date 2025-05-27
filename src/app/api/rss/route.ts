import { NextResponse } from 'next/server'
import { getRSSData } from '@/lib/rss-storage'

export async function GET() {
  try {
    const rssData = await getRSSData()

    return NextResponse.json({
      success: true,
      data: rssData,
      postCount: rssData.posts.length
    })
  } catch (error) {
    console.error('Failed to get RSS data:', error)

    return NextResponse.json({
      success: false,
      message: 'Failed to get RSS data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

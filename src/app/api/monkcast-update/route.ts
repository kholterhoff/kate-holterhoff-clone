import { NextRequest, NextResponse } from 'next/server'
import {
  saveMonkCastData,
  loadMonkCastData,
  isMonkCastDataExpired,
  type FeedItem,
} from '@/lib/monkcast-storage'

const MONKCAST_POST_COUNT = 6
const MONKCAST_RSS_URL = 'https://api.riverside.fm/hosting/tBthkY3f.rss'
const DEFAULT_PODCAST_IMAGE = 'https://redmonk.com/wp-content/uploads/2018/07/Monkchips-1.jpg'
const REDMONK_URL_PATTERN = /https?:\/\/redmonk\.com\/[^\s"'<>)]+/i

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

function truncate(text: string, maxLength: number = 170): string {
  if (!text) {
    return ''
  }

  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text
}

function normalizeRedmonkUrl(url: string): string {
  try {
    const normalized = new URL(url.trim())
    normalized.hash = ''

    if (/(^|\.)redmonk\.com$/i.test(normalized.hostname) && !normalized.pathname.endsWith('/')) {
      normalized.pathname = `${normalized.pathname}/`
    }

    return normalized.toString()
  } catch {
    return url.trim()
  }
}

function extractRedmonkUrl(item: Record<string, unknown>): string | undefined {
  const candidateTexts = [
    item.description,
    item.content,
    item.summary,
    item.contentSnippet,
  ].filter((value): value is string => typeof value === 'string' && value.length > 0)

  for (const text of candidateTexts) {
    const match = text.match(REDMONK_URL_PATTERN)
    if (!match?.[0]) {
      continue
    }

    const cleanedUrl = match[0].replace(/(&quot;|&gt;|&lt;|[,;.!?])+$/, '')
    return normalizeRedmonkUrl(cleanedUrl)
  }

  return undefined
}

function extractFeedImage(item: Record<string, any>): string | undefined {
  if (item.enclosure?.link && item.enclosure.type?.startsWith('image/')) {
    return item.enclosure.link
  }

  if (typeof item.thumbnail === 'string' && item.thumbnail.length > 0) {
    return item.thumbnail
  }

  if (typeof item.image === 'string' && item.image.length > 0) {
    return item.image
  }

  if (item.image?.href) {
    return String(item.image.href)
  }

  const content = [item.content, item.description, item.summary]
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .join(' ')
  const imageMatch = content.match(/<img[^>]+src=["']([^"'>]+)["'][^>]*>/i)

  return imageMatch?.[1]
}

async function extractCoverImageFromRedmonk(url: string): Promise<string | undefined> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Kate Holterhoff Portfolio RSS Reader',
        Accept: 'text/html'
      }
    })

    if (!response.ok) {
      return undefined
    }

    const html = await response.text()
    const selectors = [
      /<meta\s+property="og:image"\s+content="([^"]+)"/i,
      /<meta\s+content="([^"]+)"\s+property="og:image"/i,
      /<img[^>]+class="[^"]*featured-image[^"]*"[^>]+src="([^"]+)"/i,
      /<div[^>]+class="[^"]*post-content[^"]*"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"/i,
    ]

    for (const selector of selectors) {
      const match = html.match(selector)
      if (match?.[1] && !match[1].includes('statcounter')) {
        return match[1]
      }
    }
  } catch (error) {
    console.warn('MonkCast image extraction failed for', url, error)
  }

  return undefined
}

function formatEpisodeDescription(item: Record<string, unknown>): string {
  const rawDescription = [
    item.summary,
    item.contentSnippet,
    item.description,
    item.content,
  ].find((value): value is string => typeof value === 'string' && value.length > 0)

  const cleaned = stripHtml(rawDescription || '')
  return truncate(cleaned || 'Listen to the latest MonkCast episode from RedMonk.')
}

async function buildEpisode(item: Record<string, any>, feedImage?: string): Promise<FeedItem> {
  const redmonkUrl = extractRedmonkUrl(item)
  const coverImage = redmonkUrl
    ? await extractCoverImageFromRedmonk(redmonkUrl)
    : undefined

  return {
    title: item.title || 'Untitled episode',
    link: redmonkUrl || item.link || 'https://monkcast.com/',
    description: formatEpisodeDescription(item),
    pubDate: item.pubDate || new Date().toISOString(),
    image: coverImage || extractFeedImage(item) || feedImage || DEFAULT_PODCAST_IMAGE,
    content: item.content || item.description || item.summary || ''
  }
}

export async function POST(_request: NextRequest) {
  try {
    console.log('MonkCast Update API: Starting podcast update process')

    const existingData = await loadMonkCastData()
    if (existingData && existingData.posts.length >= MONKCAST_POST_COUNT && !isMonkCastDataExpired(existingData.lastUpdated, 1)) {
      console.log('MonkCast Update API: Using recent cached data (less than 1 hour old)')
      return NextResponse.json({
        success: true,
        data: existingData,
        message: 'Using recent cached MonkCast data'
      })
    }

    const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MONKCAST_RSS_URL)}`
    const response = await fetch(rss2jsonUrl, {
      headers: {
        'User-Agent': 'Kate Holterhoff Portfolio RSS Reader'
      }
    })

    if (!response.ok) {
      throw new Error(`RSS2JSON API returned ${response.status}`)
    }

    const jsonData = await response.json()
    console.log('MonkCast Update API: RSS2JSON response status:', jsonData.status)

    if (jsonData.status !== 'ok' || !jsonData.items || jsonData.items.length === 0) {
      throw new Error('Invalid MonkCast RSS data received from RSS2JSON')
    }

    const feedImage = typeof jsonData.feed?.image === 'string' && jsonData.feed.image.length > 0
      ? jsonData.feed.image
      : DEFAULT_PODCAST_IMAGE

    const feedItems: FeedItem[] = []
    for (const item of jsonData.items.slice(0, MONKCAST_POST_COUNT)) {
      feedItems.push(await buildEpisode(item, feedImage))
    }

    const monkCastData = {
      posts: feedItems,
      lastUpdated: new Date().toISOString()
    }

    await saveMonkCastData(monkCastData)
    console.log('MonkCast Update API: Successfully updated MonkCast cache with', feedItems.length, 'episodes')

    return NextResponse.json({
      success: true,
      data: monkCastData,
      message: `Successfully updated MonkCast cache with ${feedItems.length} episodes`
    })
  } catch (error) {
    console.error('MonkCast Update API Error:', error)

    try {
      const fallbackData = await loadMonkCastData()
      if (fallbackData) {
        console.log('MonkCast Update API: Returning cached data as fallback')
        return NextResponse.json({
          success: true,
          data: fallbackData,
          message: 'Update failed, returning cached MonkCast data'
        })
      }
    } catch (fallbackError) {
      console.error('MonkCast Update API: Fallback also failed:', fallbackError)
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: { posts: [], lastUpdated: '' }
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  return POST(request)
}

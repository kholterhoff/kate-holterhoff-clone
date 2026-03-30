import { loadCachedFeedData, saveCachedFeedData, isFeedDataExpired, type CachedFeedData } from '@/lib/feed-cache'
import { extractImageFromMarkup, stripHtml, truncateText, type FeedItem } from '@/lib/feed-utils'
import { MONKCAST_POST_COUNT, type MonkCastItem } from '@/lib/monkcast-feed-shared'

const MONKCAST_CACHE_FILE = '.monkcast-cache.json'
const MONKCAST_RSS_URL = 'https://api.riverside.fm/hosting/tBthkY3f.rss'
const DEFAULT_PODCAST_IMAGE = 'https://redmonk.com/wp-content/uploads/2018/07/Monkchips-1.jpg'
const REDMONK_URL_PATTERN = /https?:\/\/redmonk\.com\/[^\s"'<>)]+/i

export type MonkCastData = CachedFeedData<MonkCastItem>

interface MonkCastFeedItem extends Record<string, unknown> {
  title?: string
  link?: string
  description?: string
  content?: string
  summary?: string
  contentSnippet?: string
  pubDate?: string
  thumbnail?: string
  image?: string | { href?: string }
  enclosure?: {
    link?: string
    type?: string
  }
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

function extractRedmonkUrl(item: MonkCastFeedItem): string | undefined {
  const candidateTexts = [item.description, item.content, item.summary, item.contentSnippet].filter(
    (value): value is string => typeof value === 'string' && value.length > 0
  )

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

function extractFeedImage(item: MonkCastFeedItem): string | undefined {
  if (item.enclosure?.link && item.enclosure.type?.startsWith('image/')) {
    return item.enclosure.link
  }

  if (typeof item.thumbnail === 'string' && item.thumbnail.length > 0) {
    return item.thumbnail
  }

  if (typeof item.image === 'string' && item.image.length > 0) {
    return item.image
  }

  if (typeof item.image === 'object' && item.image?.href) {
    return String(item.image.href)
  }

  const content = [item.content, item.description, item.summary]
    .filter((value): value is string => typeof value === 'string' && value.length > 0)
    .join(' ')

  return extractImageFromMarkup(content)
}

async function extractCoverImageFromRedmonk(url: string): Promise<string | undefined> {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'Kate Holterhoff Portfolio RSS Reader',
      Accept: 'text/html',
    },
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

  return undefined
}

function formatEpisodeDescription(item: MonkCastFeedItem): string {
  const rawDescription = [item.summary, item.contentSnippet, item.description, item.content].find(
    (value): value is string => typeof value === 'string' && value.length > 0
  )

  return truncateText(stripHtml(rawDescription || 'Listen to the latest MonkCast episode from RedMonk.'), 170)
}

async function buildEpisode(item: MonkCastFeedItem, feedImage?: string): Promise<MonkCastItem> {
  const redmonkUrl = extractRedmonkUrl(item)
  const episodeImage = extractFeedImage(item)
  const coverImage =
    !episodeImage && redmonkUrl ? await extractCoverImageFromRedmonk(redmonkUrl) : undefined

  return {
    title: item.title || 'Untitled episode',
    link: redmonkUrl || item.link || 'https://monkcast.com/',
    description: formatEpisodeDescription(item),
    pubDate: item.pubDate || new Date().toISOString(),
    image: episodeImage || coverImage || feedImage || DEFAULT_PODCAST_IMAGE,
    content: String(item.content || item.description || item.summary || ''),
  }
}

export async function saveMonkCastData(data: MonkCastData): Promise<void> {
  await saveCachedFeedData(MONKCAST_CACHE_FILE, data)
}

export async function loadMonkCastData(): Promise<MonkCastData | null> {
  return loadCachedFeedData<MonkCastItem>(MONKCAST_CACHE_FILE)
}

export function isMonkCastDataExpired(lastUpdated: string, maxAgeHours: number = 24): boolean {
  return isFeedDataExpired(lastUpdated, maxAgeHours)
}

export async function getMonkCastPosts(): Promise<MonkCastItem[]> {
  const cachedData = await loadMonkCastData()
  return cachedData?.posts.slice(0, MONKCAST_POST_COUNT) || []
}

export async function refreshMonkCastData(force: boolean = false): Promise<MonkCastData> {
  const existingData = await loadMonkCastData()

  if (
    !force &&
    existingData &&
    existingData.posts.length >= MONKCAST_POST_COUNT &&
    !isMonkCastDataExpired(existingData.lastUpdated, 1)
  ) {
    return existingData
  }

  const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(MONKCAST_RSS_URL)}`
  const response = await fetch(rss2jsonUrl, {
    headers: {
      'User-Agent': 'Kate Holterhoff Portfolio RSS Reader',
    },
  })

  if (!response.ok) {
    throw new Error(`RSS2JSON API returned ${response.status}`)
  }

  const jsonData = (await response.json()) as {
    status?: string
    feed?: { image?: string }
    items?: MonkCastFeedItem[]
  }

  if (jsonData.status !== 'ok' || !jsonData.items?.length) {
    throw new Error('Invalid MonkCast RSS data received from RSS2JSON')
  }

  const feedImage =
    typeof jsonData.feed?.image === 'string' && jsonData.feed.image.length > 0
      ? jsonData.feed.image
      : DEFAULT_PODCAST_IMAGE

  const posts = await Promise.all(
    jsonData.items.slice(0, MONKCAST_POST_COUNT).map((item) => buildEpisode(item, feedImage))
  )

  const monkCastData: MonkCastData = {
    posts,
    lastUpdated: new Date().toISOString(),
  }

  await saveMonkCastData(monkCastData)
  return monkCastData
}

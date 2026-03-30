import { loadCachedFeedData, saveCachedFeedData, isFeedDataExpired, type CachedFeedData } from '@/lib/feed-cache'
import { extractImageFromMarkup, stripHtml, truncateText, type FeedItem } from '@/lib/feed-utils'
import { fallbackPosts, RSS_POST_COUNT, type RSSItem } from '@/lib/rss-feed-shared'

const RSS_CACHE_FILE = '.rss-cache.json'
const RSS_SOURCE_URL = 'https://redmonk.com/kholterhoff/feed/'
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_SOURCE_URL)}`

export type RSSData = CachedFeedData<RSSItem>

interface RSS2JSONItem {
  title?: string
  link?: string
  description?: string
  pubDate?: string
  content?: string
  thumbnail?: string
  enclosure?: {
    link?: string
    type?: string
  }
}

function extractRSSImage(item: RSS2JSONItem): string | undefined {
  if (item.enclosure?.link && item.enclosure.type?.startsWith('image/')) {
    return item.enclosure.link
  }

  if (item.thumbnail) {
    return item.thumbnail
  }

  const markup = item.content || item.description || ''
  return extractImageFromMarkup(markup)
}

function mapRSSItem(item: RSS2JSONItem): RSSItem {
  return {
    title: item.title || '',
    link: item.link || '',
    description: truncateText(stripHtml(item.description || ''), 150),
    pubDate: item.pubDate || '',
    image: extractRSSImage(item),
    content: item.content || item.description,
  }
}

export async function saveRSSData(data: RSSData): Promise<void> {
  await saveCachedFeedData(RSS_CACHE_FILE, data)
}

export async function loadRSSData(): Promise<RSSData | null> {
  return loadCachedFeedData<RSSItem>(RSS_CACHE_FILE)
}

export function isRSSDataExpired(lastUpdated: string, maxAgeHours: number = 24): boolean {
  return isFeedDataExpired(lastUpdated, maxAgeHours)
}

export async function getRSSPosts(): Promise<RSSItem[]> {
  const cachedData = await loadRSSData()

  if (cachedData?.posts.length) {
    return cachedData.posts.slice(0, RSS_POST_COUNT)
  }

  return fallbackPosts
}

export async function refreshRSSData(force: boolean = false): Promise<RSSData> {
  const existingData = await loadRSSData()

  if (
    !force &&
    existingData &&
    existingData.posts.length >= RSS_POST_COUNT &&
    !isRSSDataExpired(existingData.lastUpdated, 1)
  ) {
    return existingData
  }

  const response = await fetch(RSS2JSON_URL, {
    headers: {
      'User-Agent': 'Kate Holterhoff Portfolio RSS Reader',
    },
  })

  if (!response.ok) {
    throw new Error(`RSS2JSON API returned ${response.status}`)
  }

  const jsonData = (await response.json()) as { status?: string; items?: RSS2JSONItem[] }

  if (jsonData.status !== 'ok' || !jsonData.items?.length) {
    throw new Error('Invalid RSS data received from RSS2JSON')
  }

  const rssData: RSSData = {
    posts: jsonData.items.slice(0, RSS_POST_COUNT).map(mapRSSItem),
    lastUpdated: new Date().toISOString(),
  }

  await saveRSSData(rssData)
  return rssData
}

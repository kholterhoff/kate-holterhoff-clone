import { loadCachedFeedData, saveCachedFeedData, isFeedDataExpired, type CachedFeedData } from '@/lib/feed-cache'
import { extractImageFromMarkup, stripHtml, truncateText, type FeedItem } from '@/lib/feed-utils'

const RSS_CACHE_FILE = '.rss-cache.json'
const RSS_SOURCE_URL = 'https://redmonk.com/kholterhoff/feed/'
const RSS2JSON_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_SOURCE_URL)}`

export const RSS_POST_COUNT = 6

export type RSSItem = FeedItem
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

export const fallbackPosts: RSSItem[] = [
  {
    title: 'Optimizing JavaScript Delivery: Signals v React Compiler',
    link: 'https://redmonk.com/kholterhoff/2025/05/13/javascript-signals-react-compiler/',
    description:
      "JavaScript in 2025 isn't exactly lightweight. Shipping JS code involves managing browser quirks, massive bundle sizes, hydration woes, and performance tuning that can sometimes feel like black magic to developers...",
    pubDate: 'Tue, 13 May 2025 15:36:41 +0000',
    image: 'https://redmonk.com/kholterhoff/files/2025/05/chefingredients-scaled.jpeg',
  },
  {
    title: 'UI Component Libraries, shadcn/ui, and the Revenge of Copypasta',
    link: 'https://redmonk.com/kholterhoff/2025/04/22/ui-component-libraries-shadcn-ui-and-the-revenge-of-copypasta/',
    description:
      'Shadcn/ui, a hugely popular open source React UI component library, has become critical frontend infrastructure for teams building modern app interfaces...',
    pubDate: 'Tue, 22 Apr 2025 13:19:09 +0000',
    image: 'https://redmonk.com/kholterhoff/files/2025/04/giphy.gif',
  },
  {
    title: 'Is Frontend Observability Hipster RUM?',
    link: 'https://redmonk.com/kholterhoff/2025/04/02/is-frontend-observability-hipster-rum/',
    description:
      'Several observability vendors have launched frontend observability products recently, raising new questions about where browser telemetry fits in the stack...',
    pubDate: 'Wed, 2 Apr 2025 16:59:47 +0000',
    image:
      'https://redmonk.com/kholterhoff/files/2025/04/Screenshot-2025-02-28-at-1.57.30%E2%80%AFPM.png',
  },
  {
    title: 'New TypeScript Compiler, Who Dis?',
    link: 'https://redmonk.com/kholterhoff/2025/03/13/new-typescript-compiler-who-dis/',
    description:
      'TypeScript is moving fast again, and Microsoft’s compiler overhaul has major implications for build speed, tooling, and everyday developer workflows...',
    pubDate: 'Thu, 13 Mar 2025 15:27:48 +0000',
    image: 'https://redmonk.com/kholterhoff/files/2025/03/lance-moteur.gif',
  },
  {
    title: 'AI Agents and the CEOs',
    link: 'https://redmonk.com/kholterhoff/2025/02/18/ai-agents-and-the-ceos/',
    description:
      'Corporate AI messaging has shifted hard toward agents, and that trend says as much about ROI expectations and labor narratives as it does about the tech itself...',
    pubDate: 'Tue, 18 Feb 2025 20:33:03 +0000',
    image: 'https://redmonk.com/kholterhoff/files/2025/02/ai-ceo.jpeg',
  },
  {
    title: 'The Problem of JavaScript Code Delivery',
    link: 'https://redmonk.com/kholterhoff/2024/06/25/the-problem-of-javascript-code-delivery/',
    description:
      'An analysis of current challenges in JavaScript application delivery and modern solutions to improve performance and developer experience...',
    pubDate: 'Tue, 25 Jun 2024 10:00:00 +0000',
  },
]

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

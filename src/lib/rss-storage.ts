import { promises as fs } from 'fs'
import path from 'path'

interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
  content?: string
}

interface RSSData {
  posts: RSSItem[]
  lastUpdated: string
  source: 'live-rss' | 'fallback'
}

const RSS_DATA_FILE = path.join(process.cwd(), 'data', 'rss-cache.json')

// Fallback data
const fallbackData: RSSData = {
  posts: [
    {
      title: "Optimizing JavaScript Delivery: Signals v React Compiler",
      link: "https://redmonk.com/kholterhoff/2025/05/13/javascript-signals-react-compiler/",
      description: "JavaScript in 2025 isn't exactly lightweight. Shipping JS code involves managing browser quirks, massive bundle sizes, hydration woes, and performance tuning that can sometimes feel like black magic to developers...",
      pubDate: "Tue, 13 May 2025 15:36:41 +0000",
      image: "https://redmonk.com/kholterhoff/files/2025/05/chefingredients-scaled.jpeg"
    },
    {
      title: "The Problem of JavaScript Code Delivery",
      link: "https://redmonk.com/kholterhoff/2024/06/25/the-problem-of-javascript-code-delivery/",
      description: "An analysis of current challenges in JavaScript application delivery and modern solutions to improve performance and developer experience...",
      pubDate: "Tue, 25 Jun 2024 10:00:00 +0000"
    },
    {
      title: "React Just Changed Forever",
      link: "https://redmonk.com/kholterhoff/",
      description: "React has never really thought about build tools too much. Historically React has just been the runtime. With Server Components they moved to the server, but with React Compiler they're moving to build...",
      pubDate: "Wed, 15 May 2024 10:00:00 +0000"
    }
  ],
  lastUpdated: new Date().toISOString(),
  source: 'fallback'
}

export async function ensureDataDirectory() {
  const dataDir = path.dirname(RSS_DATA_FILE)
  try {
    await fs.access(dataDir)
  } catch {
    await fs.mkdir(dataDir, { recursive: true })
  }
}

export async function getRSSData(): Promise<RSSData> {
  try {
    await ensureDataDirectory()
    const data = await fs.readFile(RSS_DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.log('No cached RSS data found, using fallback')
    return fallbackData
  }
}

export async function saveRSSData(data: RSSData): Promise<void> {
  try {
    await ensureDataDirectory()
    await fs.writeFile(RSS_DATA_FILE, JSON.stringify(data, null, 2))
    console.log('RSS data saved to cache at:', new Date().toISOString())
  } catch (error) {
    console.error('Failed to save RSS data:', error)
    throw error
  }
}

export async function updateRSSData(posts: RSSItem[]): Promise<RSSData> {
  const data: RSSData = {
    posts,
    lastUpdated: new Date().toISOString(),
    source: 'live-rss'
  }

  await saveRSSData(data)
  return data
}

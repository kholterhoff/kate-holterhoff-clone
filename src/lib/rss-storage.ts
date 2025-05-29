import { promises as fs } from 'fs'
import path from 'path'

export interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
  image?: string
  content?: string
}

export interface RSSData {
  posts: RSSItem[]
  lastUpdated: string
}

const RSS_CACHE_FILE = path.join(process.cwd(), '.rss-cache.json')

export async function saveRSSData(data: RSSData): Promise<void> {
  try {
    await fs.writeFile(RSS_CACHE_FILE, JSON.stringify(data, null, 2))
    console.log('RSS data saved to cache')
  } catch (error) {
    console.error('Error saving RSS data:', error)
    throw error
  }
}

export async function loadRSSData(): Promise<RSSData | null> {
  try {
    const fileContent = await fs.readFile(RSS_CACHE_FILE, 'utf8')
    const data = JSON.parse(fileContent) as RSSData
    console.log('RSS data loaded from cache, last updated:', data.lastUpdated)
    return data
  } catch (error) {
    console.log('No RSS cache file found or error reading cache:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

export function isRSSDataExpired(lastUpdated: string, maxAgeHours: number = 24): boolean {
  const lastUpdateTime = new Date(lastUpdated).getTime()
  const now = Date.now()
  const maxAge = maxAgeHours * 60 * 60 * 1000 // Convert hours to milliseconds
  
  return (now - lastUpdateTime) > maxAge
}
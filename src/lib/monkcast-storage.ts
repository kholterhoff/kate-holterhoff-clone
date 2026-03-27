import { promises as fs } from 'fs'
import path from 'path'

export interface FeedItem {
  title: string
  link: string
  description: string
  pubDate: string
  image?: string
  content?: string
}

export interface FeedData {
  posts: FeedItem[]
  lastUpdated: string
}

const MONKCAST_CACHE_FILE = path.join(process.cwd(), '.monkcast-cache.json')

export async function saveMonkCastData(data: FeedData): Promise<void> {
  try {
    await fs.writeFile(MONKCAST_CACHE_FILE, JSON.stringify(data, null, 2))
    console.log('MonkCast data saved to cache')
  } catch (error) {
    console.error('Error saving MonkCast data:', error)
    throw error
  }
}

export async function loadMonkCastData(): Promise<FeedData | null> {
  try {
    const fileContent = await fs.readFile(MONKCAST_CACHE_FILE, 'utf8')
    const data = JSON.parse(fileContent) as FeedData
    console.log('MonkCast data loaded from cache, last updated:', data.lastUpdated)
    return data
  } catch (error) {
    console.log('No MonkCast cache file found or error reading cache:', error instanceof Error ? error.message : 'Unknown error')
    return null
  }
}

export function isMonkCastDataExpired(lastUpdated: string, maxAgeHours: number = 24): boolean {
  const lastUpdateTime = new Date(lastUpdated).getTime()
  const now = Date.now()
  const maxAge = maxAgeHours * 60 * 60 * 1000

  return (now - lastUpdateTime) > maxAge
}

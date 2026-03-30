import { promises as fs } from 'fs'
import os from 'os'
import path from 'path'

export interface CachedFeedData<T> {
  posts: T[]
  lastUpdated: string
}

function resolveCacheFile(filename: string): string {
  const baseDir = process.env.NODE_ENV === 'production' ? os.tmpdir() : process.cwd()

  return path.join(baseDir, filename)
}

export async function saveCachedFeedData<T>(
  filename: string,
  data: CachedFeedData<T>
): Promise<void> {
  const cacheFile = resolveCacheFile(filename)
  await fs.writeFile(cacheFile, JSON.stringify(data, null, 2))
}

export async function loadCachedFeedData<T>(
  filename: string
): Promise<CachedFeedData<T> | null> {
  try {
    const cacheFile = resolveCacheFile(filename)
    const fileContent = await fs.readFile(cacheFile, 'utf8')

    return JSON.parse(fileContent) as CachedFeedData<T>
  } catch {
    return null
  }
}

export function isFeedDataExpired(lastUpdated: string, maxAgeHours: number = 24): boolean {
  const lastUpdateTime = new Date(lastUpdated).getTime()

  if (Number.isNaN(lastUpdateTime)) {
    return true
  }

  const maxAge = maxAgeHours * 60 * 60 * 1000
  return Date.now() - lastUpdateTime > maxAge
}

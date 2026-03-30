'use client'

import { useEffect, useState } from 'react'
import FeedSection from '@/components/FeedSection'
import { fallbackPosts, RSS_POST_COUNT, type RSSItem } from '@/lib/rss-feed-shared'

interface FeedResponse {
  success: boolean
  data: {
    posts: RSSItem[]
    lastUpdated: string
  }
}

export default function RSSFeed() {
  const [posts, setPosts] = useState<RSSItem[]>(fallbackPosts)

  useEffect(() => {
    let cancelled = false

    const loadPosts = async () => {
      try {
        const cachedResponse = await fetch('/api/rss', { cache: 'no-store' })
        if (cachedResponse.ok) {
          const cachedData = (await cachedResponse.json()) as FeedResponse
          if (cachedData.success && cachedData.data.posts.length >= RSS_POST_COUNT) {
            if (!cancelled) {
              setPosts(cachedData.data.posts.slice(0, RSS_POST_COUNT))
            }
            return
          }
        }

        const liveResponse = await fetch('/api/rss-update', {
          method: 'POST',
          cache: 'no-store',
        })

        if (!liveResponse.ok) {
          return
        }

        const liveData = (await liveResponse.json()) as FeedResponse
        if (liveData.success && liveData.data.posts.length > 0 && !cancelled) {
          setPosts(liveData.data.posts.slice(0, RSS_POST_COUNT))
        }
      } catch {
        // Keep fallback posts if network requests fail.
      }
    }

    void loadPosts()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <FeedSection
      items={posts}
      actionLabel="Read more"
      ctaHref="https://redmonk.com/kholterhoff/"
      ctaLabel="View All Posts"
      emptyMessage="Unable to load the latest RedMonk posts right now."
      emptyHref="https://redmonk.com/kholterhoff/"
      emptyLinkLabel="redmonk.com/kholterhoff"
      fallbackLabel="RM"
      imageWrapperClassName="relative h-64 overflow-hidden bg-gradient-to-br from-coral to-orange"
      imageClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      bodyClassName="flex min-h-[16rem] flex-1 flex-col bg-black p-5 sm:p-6"
      titleClassName="mb-3 text-xl font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-[#ffd7c4]"
    />
  )
}

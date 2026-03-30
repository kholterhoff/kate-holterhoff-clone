'use client'

import { useEffect, useState } from 'react'
import FeedSection from '@/components/FeedSection'
import { MONKCAST_POST_COUNT, type MonkCastItem } from '@/lib/monkcast-feed-shared'

interface FeedResponse {
  success: boolean
  data: {
    posts: MonkCastItem[]
    lastUpdated: string
  }
}

export default function MonkCastFeed() {
  const [episodes, setEpisodes] = useState<MonkCastItem[]>([])

  useEffect(() => {
    let cancelled = false

    const loadEpisodes = async () => {
      try {
        const cachedResponse = await fetch('/api/monkcast', { cache: 'no-store' })
        if (cachedResponse.ok) {
          const cachedData = (await cachedResponse.json()) as FeedResponse
          if (cachedData.success && cachedData.data.posts.length >= MONKCAST_POST_COUNT) {
            if (!cancelled) {
              setEpisodes(cachedData.data.posts.slice(0, MONKCAST_POST_COUNT))
            }
            return
          }
        }

        const liveResponse = await fetch('/api/monkcast-update', {
          method: 'POST',
          cache: 'no-store',
        })

        if (!liveResponse.ok) {
          return
        }

        const liveData = (await liveResponse.json()) as FeedResponse
        if (liveData.success && liveData.data.posts.length > 0 && !cancelled) {
          setEpisodes(liveData.data.posts.slice(0, MONKCAST_POST_COUNT))
        }
      } catch {
        // Keep the empty state if network requests fail.
      }
    }

    void loadEpisodes()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <FeedSection
      title="The MonkCast"
      items={episodes}
      actionLabel="Open episode"
      ctaHref="https://monkcast.com/"
      ctaLabel="Visit MonkCast"
      emptyMessage="Unable to load MonkCast episodes right now."
      emptyHref="https://monkcast.com/"
      emptyLinkLabel="monkcast.com"
      fallbackLabel="MC"
      imageWrapperClassName="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-coral to-orange"
      imageClassName="absolute inset-0 h-full w-full bg-black object-contain"
      bodyClassName="flex min-h-[12rem] flex-1 flex-col bg-black p-5 sm:p-6"
      titleClassName="mb-5 text-xl font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-[#ffd7c4]"
      showDescription={false}
    />
  )
}

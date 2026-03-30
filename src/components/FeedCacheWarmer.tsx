'use client'

import { useEffect } from 'react'

const FEED_REFRESH_ENDPOINTS = ['/api/rss-update', '/api/monkcast-update']

export default function FeedCacheWarmer() {
  useEffect(() => {
    void Promise.allSettled(
      FEED_REFRESH_ENDPOINTS.map((endpoint) =>
        fetch(endpoint, {
          method: 'POST',
          cache: 'no-store',
        })
      )
    )
  }, [])

  return null
}

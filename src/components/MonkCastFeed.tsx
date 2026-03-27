"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface MonkCastItem {
  title: string
  link: string
  description: string
  pubDate: string
  image?: string
}

const MONKCAST_POST_COUNT = 6

export default function MonkCastFeed() {
  const [episodes, setEpisodes] = useState<MonkCastItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    let cancelled = false

    const fetchMonkCast = async () => {
      setLoading(true)

      try {
        const cachedResponse = await fetch('/api/monkcast')
        if (cachedResponse.ok) {
          const cachedData = await cachedResponse.json()
          if (cachedData.success && cachedData.data.posts.length >= MONKCAST_POST_COUNT) {
            if (!cancelled) {
              setEpisodes(cachedData.data.posts.slice(0, MONKCAST_POST_COUNT))
              setError(null)
              setLoading(false)
            }
            return
          }
        }

        const liveResponse = await fetch('/api/monkcast-update', { method: 'POST' })
        const liveData = await liveResponse.json()

        if (liveData.success && liveData.data.posts.length > 0) {
          if (!cancelled) {
            setEpisodes(liveData.data.posts.slice(0, MONKCAST_POST_COUNT))
            setError(null)
          }
        } else if (!cancelled) {
          setError('Unable to load MonkCast episodes right now.')
        }
      } catch (err) {
        console.error('MonkCast fetch error:', err)
        if (!cancelled) {
          setError('Unable to load MonkCast episodes right now.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchMonkCast()

    return () => {
      cancelled = true
    }
  }, [])

  const handleRefreshMonkCast = async () => {
    setUpdating(true)
    try {
      const response = await fetch('/api/monkcast-update', { method: 'POST' })
      const result = await response.json()

      if (result.success && result.data.posts.length > 0) {
        setEpisodes(result.data.posts.slice(0, MONKCAST_POST_COUNT))
        setError(null)
      } else {
        setError('Unable to refresh MonkCast episodes right now.')
      }
    } catch (err) {
      console.error('Manual MonkCast refresh error:', err)
      setError('Unable to refresh MonkCast episodes right now.')
    } finally {
      setUpdating(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  if (loading && episodes.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">The MonkCast</h2>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(MONKCAST_POST_COUNT)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm">
                <div className="h-1/2 bg-gray-100" />
                <div className="flex h-1/2 flex-col justify-end p-5 sm:p-6">
                  <div className="mb-3 h-3 w-24 rounded bg-gray-700" />
                  <div className="mb-2 h-6 w-4/5 rounded bg-gray-600" />
                  <div className="mb-2 h-6 w-3/5 rounded bg-gray-600" />
                  <div className="h-4 w-28 rounded bg-gray-700" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error && episodes.length === 0) {
    return (
      <div className="w-full">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold">The MonkCast</h2>
        </div>
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">{error}</p>
          <p className="mt-2 text-sm text-gray-600">
            Visit <Link href="https://monkcast.com/" className="text-coral hover:underline">monkcast.com</Link> directly
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">The MonkCast</h2>
        <button
          onClick={handleRefreshMonkCast}
          disabled={updating}
          className={`px-3 py-1 text-sm rounded-md border transition-colors ${
            updating 
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:text-coral'
          }`}
          title="Refresh MonkCast feed"
        >
          {updating ? (
            <>
              <svg className="w-4 h-4 animate-spin inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Updating...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode, index) => (
          <Link
            key={index}
            href={episode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <article className="aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-coral/40 group-hover:shadow-xl">
              <div className="relative h-1/2 overflow-hidden bg-gradient-to-br from-coral to-orange">
                <div
                  className={`absolute inset-0 items-center justify-center bg-gradient-to-br from-coral to-orange ${
                    episode.image ? "hidden" : "flex"
                  }`}
                  data-fallback="true"
                >
                  <span className="text-sm font-semibold tracking-[0.3em] text-white">MC</span>
                </div>
                {episode.image ? (
                  <img
                    src={episode.image}
                    alt={episode.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                      const fallback = target.parentElement?.querySelector('[data-fallback="true"]') as HTMLElement | null
                      if (fallback) {
                        fallback.style.display = "flex"
                      }
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/20" />
              </div>
              <div className="flex h-1/2 flex-col justify-end bg-black p-5 sm:p-6">
                <time className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/85">
                  {formatDate(episode.pubDate)}
                </time>

                <h3 className="mb-3 text-xl font-semibold leading-tight text-white transition-colors duration-200 group-hover:text-orange line-clamp-3">
                  {episode.title}
                </h3>

                <p className="mb-4 text-sm leading-6 text-white/90 line-clamp-3">
                  {episode.description}
                </p>

                <span className="inline-flex items-center text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                  Open episode
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="https://monkcast.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-coral to-orange text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          Visit MonkCast
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">The MonkCast</h1>
        </div>
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(MONKCAST_POST_COUNT)].map((_, i) => (
            <div key={i} className="h-full animate-pulse">
              <div className="h-full rounded-[1.45rem] bg-gradient-to-br from-coral via-orange to-[#ffb48d] p-[3px] shadow-[0_20px_45px_-28px_rgba(245,122,73,0.55)]">
                <div className="flex h-full flex-col overflow-hidden rounded-[1.24rem] bg-black">
                  <div className="aspect-video w-full bg-gray-100" />
                  <div className="flex min-h-[12rem] flex-1 flex-col p-5 sm:p-6">
                    <div className="mb-3 h-3 w-24 rounded bg-gray-700" />
                    <div className="mb-3 h-7 w-5/6 rounded bg-gray-600" />
                    <div className="mb-5 h-7 w-4/6 rounded bg-gray-600" />
                    <div className="h-4 w-28 rounded bg-gray-700" />
                  </div>
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">The MonkCast</h1>
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold">The MonkCast</h1>
      </div>
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {episodes.map((episode, index) => (
          <Link
            key={index}
            href={episode.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
          >
            <div className="h-full rounded-[1.45rem] bg-gradient-to-br from-coral via-orange to-[#ffb48d] p-[3px] shadow-[0_22px_55px_-32px_rgba(245,122,73,0.7)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:shadow-[0_30px_70px_-28px_rgba(245,122,73,0.9)]">
              <article className="flex h-full flex-col overflow-hidden rounded-[1.24rem] bg-black">
                <div className="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-coral to-orange">
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
                      className="absolute inset-0 h-full w-full object-contain bg-black"
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
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                </div>
                <div className="flex min-h-[12rem] flex-1 flex-col bg-black p-5 sm:p-6">
                  <time className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                    {formatDate(episode.pubDate)}
                  </time>

                  <h3 className="mb-5 text-xl font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-[#ffd7c4]">
                    {episode.title}
                  </h3>

                  <span className="mt-auto inline-flex items-center text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                    Open episode
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </article>
            </div>
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

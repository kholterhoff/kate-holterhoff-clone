"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
  image?: string
  content?: string
}

const RSS_POST_COUNT = 6

// Fallback posts based on actual RedMonk content
const fallbackPosts: RSSItem[] = [
  {
    title: "Optimizing JavaScript Delivery: Signals v React Compiler",
    link: "https://redmonk.com/kholterhoff/2025/05/13/javascript-signals-react-compiler/",
    description: "JavaScript in 2025 isn't exactly lightweight. Shipping JS code involves managing browser quirks, massive bundle sizes, hydration woes, and performance tuning that can sometimes feel like black magic to developers...",
    pubDate: "Tue, 13 May 2025 15:36:41 +0000",
    image: "https://redmonk.com/kholterhoff/files/2025/05/chefingredients-scaled.jpeg"
  },
  {
    title: "UI Component Libraries, shadcn/ui, and the Revenge of Copypasta",
    link: "https://redmonk.com/kholterhoff/2025/04/22/ui-component-libraries-shadcn-ui-and-the-revenge-of-copypasta/",
    description: "Shadcn/ui, a hugely popular open source React UI component library, has become critical frontend infrastructure for teams building modern app interfaces...",
    pubDate: "Tue, 22 Apr 2025 13:19:09 +0000",
    image: "https://redmonk.com/kholterhoff/files/2025/04/giphy.gif"
  },
  {
    title: "Is Frontend Observability Hipster RUM?",
    link: "https://redmonk.com/kholterhoff/2025/04/02/is-frontend-observability-hipster-rum/",
    description: "Several observability vendors have launched frontend observability products recently, raising new questions about where browser telemetry fits in the stack...",
    pubDate: "Wed, 2 Apr 2025 16:59:47 +0000",
    image: "https://redmonk.com/kholterhoff/files/2025/04/Screenshot-2025-02-28-at-1.57.30%E2%80%AFPM.png"
  },
  {
    title: "New TypeScript Compiler, Who Dis?",
    link: "https://redmonk.com/kholterhoff/2025/03/13/new-typescript-compiler-who-dis/",
    description: "TypeScript is moving fast again, and Microsoft’s compiler overhaul has major implications for build speed, tooling, and everyday developer workflows...",
    pubDate: "Thu, 13 Mar 2025 15:27:48 +0000",
    image: "https://redmonk.com/kholterhoff/files/2025/03/lance-moteur.gif"
  },
  {
    title: "AI Agents and the CEOs",
    link: "https://redmonk.com/kholterhoff/2025/02/18/ai-agents-and-the-ceos/",
    description: "Corporate AI messaging has shifted hard toward agents, and that trend says as much about ROI expectations and labor narratives as it does about the tech itself...",
    pubDate: "Tue, 18 Feb 2025 20:33:03 +0000",
    image: "https://redmonk.com/kholterhoff/files/2025/02/ai-ceo.jpeg"
  },
  {
    title: "The Problem of JavaScript Code Delivery",
    link: "https://redmonk.com/kholterhoff/2024/06/25/the-problem-of-javascript-code-delivery/",
    description: "An analysis of current challenges in JavaScript application delivery and modern solutions to improve performance and developer experience...",
    pubDate: "Tue, 25 Jun 2024 10:00:00 +0000"
  }
]

export default function RSSFeed() {
  const [posts, setPosts] = useState<RSSItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    console.log('RSS Feed component mounted and starting to fetch data...')
    const fetchRSS = async () => {
      // Start with fallback data to show content immediately
      setPosts(fallbackPosts)
      setLoading(false)

      // First try to get cached RSS data from our API
      try {
        console.log('Fetching cached RSS data...')
        const cachedResponse = await fetch('/api/rss')
        
        if (cachedResponse.ok) {
          const cachedData = await cachedResponse.json()
          if (cachedData.success && cachedData.data.posts.length >= RSS_POST_COUNT) {
            console.log('Using cached RSS data from:', cachedData.data.lastUpdated)
            setPosts(cachedData.data.posts.slice(0, RSS_POST_COUNT))
            setError(null)
            return
          }
        }
        
        console.log('No cached data available, trying live RSS fetch...')
        
        // If no cached data, try to fetch live RSS data
        const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://redmonk.com/kholterhoff/feed/')}`
        
        const response = await fetch(rss2jsonUrl)
        if (response.ok) {
          const jsonData = await response.json()
          console.log('RSS2JSON response status:', jsonData.status)
          
          if (jsonData.status === 'ok' && jsonData.items && jsonData.items.length > 0) {
            console.log('Successfully fetched live RSS data, updating posts')
            
            // Convert RSS2JSON format to our expected format
            const feedItems: RSSItem[] = []
            for (let i = 0; i < Math.min(jsonData.items.length, RSS_POST_COUNT); i++) {
              const item = jsonData.items[i]
              
              // Extract image from content or use enclosure/thumbnail
              let imageUrl = null
              
              // Try to get image from enclosure first (RSS standard)
              if (item.enclosure && item.enclosure.link && item.enclosure.type?.startsWith('image/')) {
                imageUrl = item.enclosure.link
              }
              // Try thumbnail (RSS2JSON format)
              else if (item.thumbnail) {
                imageUrl = item.thumbnail
              }
              // Extract from content/description HTML
              else {
                const content = item.content || item.description || ''
                const imgMatch = content.match(/<img[^>]+src=["']([^"'>]+)["'][^>]*>/i)
                if (imgMatch && imgMatch[1]) {
                  imageUrl = imgMatch[1]
                }
              }
              
              feedItems.push({
                title: item.title || '',
                link: item.link || '',
                description: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                pubDate: item.pubDate || '',
                image: imageUrl || undefined,
                content: item.content || item.description
              })
            }
            setPosts(feedItems)
            setError(null)
            
            // Update the cache with fresh data
            fetch('/api/rss-update', { method: 'POST' }).catch(console.error)
            return
          }
        }
        
        // If all methods fail, keep fallback data but log the attempt
        console.log('All RSS fetch methods failed, keeping fallback data')
        
      } catch (err) {
        console.error('RSS fetch error:', err)
        // Keep fallback data, don't show error to user
        setError(null)
      }
    }

    fetchRSS()
  }, [])

  const handleRefreshRSS = async () => {
    setUpdating(true)
    try {
      console.log('Manual RSS refresh triggered')
      const response = await fetch('/api/rss-update', { method: 'POST' })
      const result = await response.json()
      
      if (result.success && result.data.posts.length > 0) {
        console.log('RSS refresh successful, updating posts')
        setPosts(result.data.posts.slice(0, RSS_POST_COUNT))
        setError(null)
      } else {
        console.error('RSS refresh failed:', result)
      }
    } catch (err) {
      console.error('Manual RSS refresh error:', err)
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

  if (loading) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6">console.log() – Debugging the tech industry</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(RSS_POST_COUNT)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] rounded-2xl border border-gray-200 bg-gray-100 p-5 shadow-sm">
                <div className="flex h-full flex-col justify-end">
                  <div className="mb-3 h-3 w-24 rounded bg-gray-200" />
                  <div className="mb-2 h-6 w-4/5 rounded bg-gray-300" />
                  <div className="mb-2 h-6 w-3/5 rounded bg-gray-300" />
                  <div className="h-4 w-28 rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full">
        <h2 className="text-2xl font-bold mb-6"></h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600">{error}</p>
          <p className="text-sm text-gray-600 mt-2">
            Visit <Link href="https://redmonk.com/kholterhoff/" className="text-coral hover:underline">redmonk.com/kholterhoff</Link> directly
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-bold">console.log() – Debugging the tech industry</h2>
        <button
          onClick={handleRefreshRSS}
          disabled={updating}
          className={`px-3 py-1 text-sm rounded-md border transition-colors ${
            updating 
              ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:text-coral'
          }`}
          title="Refresh RSS feed"
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
        {posts.map((post, index) => (
          <Link
            key={index}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <article className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-coral/40 group-hover:shadow-xl">
              <div
                className={`absolute inset-0 items-center justify-center bg-gradient-to-br from-coral to-orange ${
                  post.image ? "hidden" : "flex"
                }`}
                data-fallback="true"
              >
                <span className="text-sm font-semibold tracking-[0.3em] text-white">RM</span>
              </div>
              {post.image ? (
                <img
                  src={post.image}
                  alt={post.title}
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
              <div className="absolute inset-x-0 bottom-0 h-[72%] bg-gradient-to-t from-black via-black/85 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-orange/15" />
              <div className="relative flex h-full flex-col justify-end p-5 sm:p-6">
                <time className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/85">
                  {formatDate(post.pubDate)}
                </time>

                <h3 className="mb-3 text-xl font-semibold leading-tight text-white transition-colors duration-200 group-hover:text-orange line-clamp-3">
                  {post.title}
                </h3>

                <p className="mb-4 text-sm leading-6 text-white/90 line-clamp-3">
                  {post.description}
                </p>

                <span className="inline-flex items-center text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                  Read more
                  <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="https://redmonk.com/kholterhoff/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-coral to-orange text-white font-medium rounded-lg hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          View All Posts
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

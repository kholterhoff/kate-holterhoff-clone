'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
  image?: string
  content?: string
}

export default function RSSFeed() {
  const [posts, setPosts] = useState<RSSItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [updating, setUpdating] = useState(false)

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
  ]

  useEffect(() => {
    const fetchRSS = async () => {
      // Start with fallback data to show content immediately
      setPosts(fallbackPosts)
      setLoading(false)

      // Then try to fetch real RSS data in the background
      try {
        console.log('Attempting to fetch RSS feed...')

        // Try RSS2JSON first (most reliable for this use case)
        const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://redmonk.com/kholterhoff/feed/')}`

        const response = await fetch(rss2jsonUrl)
        if (response.ok) {
          const jsonData = await response.json()
          console.log('RSS2JSON response status:', jsonData.status)

          if (jsonData.status === 'ok' && jsonData.items && jsonData.items.length > 0) {
            console.log('Successfully fetched RSS data, updating posts')

            // Convert RSS2JSON format to our expected format
            const feedItems: RSSItem[] = []
            for (let i = 0; i < Math.min(jsonData.items.length, 5); i++) {
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
                const imgMatch = content.match(/<img[^>]+src=['""]([^'"">]+)['""][^>]*>/i)
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
            return
          }
        }

        // If RSS2JSON fails, try AllOrigins as backup
        console.log('RSS2JSON failed, trying AllOrigins...')
        const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://redmonk.com/kholterhoff/feed/')}`

        const allOriginsResponse = await fetch(allOriginsUrl)
        if (allOriginsResponse.ok) {
          const data = await allOriginsResponse.json()

          // Parse the XML
          const parser = new DOMParser()
          const xmlDoc = parser.parseFromString(data.contents, 'text/xml')

          // Check if parsing was successful
          const parserError = xmlDoc.querySelector('parsererror')
          if (parserError) {
            throw new Error('XML parsing failed')
          }

          const items = xmlDoc.querySelectorAll('item')
          if (items.length > 0) {
            console.log('Successfully parsed XML RSS data')

            const feedItems: RSSItem[] = []
            for (let i = 0; i < Math.min(items.length, 5); i++) {
              const item = items[i]
              const title = item.querySelector('title')?.textContent || ''
              const link = item.querySelector('link')?.textContent || ''
              const description = item.querySelector('description')?.textContent || ''
              const pubDate = item.querySelector('pubDate')?.textContent || ''

              feedItems.push({
                title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
                link,
                description: description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                pubDate,
                content: description
              })
            }
            setPosts(feedItems)
            setError(null)
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
        setPosts(result.data.posts)
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
        <h2 className="text-2xl font-bold mb-6">Latest from RedMonk</h2>
        <div className="grid gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg p-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
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
        <h2 className="text-2xl font-bold mb-6">Latest from RedMonk</h2>
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
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Latest from RedMonk</h2>
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
      <div className="grid gap-6">
        {posts.map((post, index) => (
          <Link
            key={index}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <article className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group-hover:border-coral/30">
              <div className="p-6">
                <div className="flex gap-4">
                  {/* Post featured image */}
                  <div className="flex-shrink-0">
                    {post.image ? (
                      <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            // Fallback to RedMonk logo if image fails to load
                            const target = e.target as HTMLImageElement
                            target.style.display = 'none'
                            const fallback = target.nextElementSibling as HTMLElement
                            if (fallback) fallback.style.display = 'flex'
                          }}
                        />
                        <div className="w-full h-full bg-gradient-to-br from-coral to-orange rounded-lg flex items-center justify-center" style={{ display: 'none' }}>
                          <span className="text-white font-bold text-sm">RM</span>
                        </div>
                      </div>
                    ) : (
                      <div className="w-24 h-24 bg-gradient-to-br from-coral to-orange rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-sm">RM</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-coral transition-colors duration-200 line-clamp-2 mb-2">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                      {post.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <time className="text-xs text-gray-500">
                        {formatDate(post.pubDate)}
                      </time>
                      <span className="text-coral text-sm font-medium group-hover:text-orange transition-colors">
                        Read more →
                      </span>
                    </div>
                  </div>
                </div>
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

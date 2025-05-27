'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

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

  useEffect(() => {
    const fetchRSS = async () => {
      try {
        // Try multiple CORS proxy services for better reliability
        const corsProxies = [
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent('https://redmonk.com/kholterhoff/feed/')}`,
          `https://api.allorigins.win/get?url=${encodeURIComponent('https://redmonk.com/kholterhoff/feed/')}`,
          `https://corsproxy.io/?${encodeURIComponent('https://redmonk.com/kholterhoff/feed/')}`
        ]

        let response: Response | null = null
        let data: any = null
        let isRss2Json = false

        // Try each proxy until one works
        for (const proxyUrl of corsProxies) {
          try {
            response = await fetch(proxyUrl)
            if (response.ok) {
              if (proxyUrl.includes('rss2json.com')) {
                const jsonData = await response.json()
                if (jsonData.status === 'ok' && jsonData.items) {
                  // Convert RSS2JSON format to our expected format
                  const feedItems: RSSItem[] = []
                  for (let i = 0; i < Math.min(jsonData.items.length, 5); i++) {
                    const item = jsonData.items[i]
                    feedItems.push({
                      title: item.title || '',
                      link: item.link || '',
                      description: (item.description || '').replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                      pubDate: item.pubDate || '',
                      content: item.content || item.description
                    })
                  }
                  setPosts(feedItems)
                  return // Success, exit early
                }
              } else if (proxyUrl.includes('allorigins.win')) {
                data = await response.json()
                data = data.contents // Extract contents from allorigins response
              } else {
                data = await response.text()
              }
              if (data) break
            }
          } catch (proxyErr) {
            console.warn('Proxy failed:', proxyUrl, proxyErr)
            continue
          }
        }

        if (!data) {
          throw new Error('All CORS proxies failed')
        }

        // Parse the XML
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(data, 'text/xml')

        // Check if parsing was successful
        const parserError = xmlDoc.querySelector('parsererror')
        if (parserError) {
          throw new Error('XML parsing failed')
        }

        const items = xmlDoc.querySelectorAll('item')
        const feedItems: RSSItem[] = []

        if (items.length === 0) {
          throw new Error('No RSS items found')
        }

        for (let i = 0; i < Math.min(items.length, 5); i++) {
          const item = items[i]
          const title = item.querySelector('title')?.textContent || ''
          const link = item.querySelector('link')?.textContent || ''
          const description = item.querySelector('description')?.textContent || ''
          const pubDate = item.querySelector('pubDate')?.textContent || ''

          // Extract image from content if available
          const content = item.querySelector('content\\:encoded, encoded')?.textContent || description
          const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i)
          const image = imgMatch ? imgMatch[1] : null

          feedItems.push({
            title: title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'),
            link,
            description: description.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
            pubDate,
            image: image || undefined,
            content
          })
        }

        setPosts(feedItems)
      } catch (err) {
        console.error('RSS fetch error:', err)

        // Fallback to actual recent posts if RSS fails
        const fallbackPosts: RSSItem[] = [
          {
            title: "Optimizing JavaScript Delivery: Signals v React Compiler",
            link: "https://redmonk.com/kholterhoff/2025/05/13/javascript-signals-react-compiler/",
            description: "JavaScript in 2025 isn't exactly lightweight. Shipping JS code involves managing browser quirks, massive bundle sizes, hydration woes, and performance tuning that can sometimes feel like black magic to developers...",
            pubDate: "Tue, 13 May 2025 15:36:41 +0000"
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

        setPosts(fallbackPosts)
        setError(null) // Don't show error, just use fallback data
      } finally {
        setLoading(false)
      }
    }

    fetchRSS()
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
      <h2 className="text-2xl font-bold mb-6">Latest from RedMonk</h2>
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
                  {/* Placeholder image or RedMonk logo */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gradient-to-br from-coral to-orange rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">RM</span>
                    </div>
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

'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
}

export default function MobileMenu({ isOpen, onToggle }: MobileMenuProps) {
  const pathname = usePathname()

  const menuItems = [
    { href: '/', label: 'home' },
    { href: '/analyst', label: 'analyst' },
    { href: '/academic', label: 'academic' },
  ]

  // Close menu when route changes
  // Close menu when route changes
  useEffect(() => {
    // Only close the menu when the route changes, not on initial render
    const handleRouteChange = () => {
      if (isOpen) {
        onToggle()
      }
    }
    
    // Listen for route changes
    window.addEventListener('popstate', handleRouteChange)
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [isOpen, onToggle])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[320px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden mobile-menu ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/" className="text-xl font-bold" onClick={onToggle}>
            <span className="font-bold">kate</span>
            <span className="font-normal">holterhoff</span>
          </Link>

          {/* Close Button */}
          <button
            onClick={onToggle}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <div className="w-6 h-6 relative">
              <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-600 transform -translate-y-1/2 rotate-45 transition-transform"></span>
              <span className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-600 transform -translate-y-1/2 -rotate-45 transition-transform"></span>
            </div>
          </button>
        </div>

        {/* Menu Items */}
        <nav className="p-6">
          <ul className="space-y-6">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href
              return (
                <li
                  key={item.href}
                  className={`mobile-menu-item ${isOpen ? 'animate-slide-in' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link
                    href={item.href}
                    onClick={onToggle}
                    className={`mobile-menu-link block text-2xl font-light transition-all duration-300 hover:text-orange hover:translate-x-2 ${
                      isActive ? 'text-coral font-medium' : 'text-gray-700'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Menu Footer - Social Links */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="border-t border-gray-200 pt-6">
            <ul className="flex flex-col space-y-4">
              {/* Twitter */}
              <li>
                <Link
                  href="https://twitter.com/KateHolterhoff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-orange transition-colors"
                  aria-label="Follow on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  <span>Twitter</span>
                </Link>
              </li>
              
              {/* LinkedIn */}
              <li>
                <Link
                  href="https://linkedin.com/in/kateholterhoff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-orange transition-colors"
                  aria-label="Follow on LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>LinkedIn</span>
                </Link>
              </li>
              
              {/* Bluesky */}
              <li>
                <Link
                  href="https://bsky.app/profile/kateholterhoff.bsky.social"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-orange transition-colors"
                  aria-label="Follow on Bluesky"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 568 501">
                    <path d="M123.121 33.6637C188.241 82.5526 258.281 181.681 284 234.873C309.719 181.681 379.759 82.5526 444.879 33.6637C491.566 1.61183 568 -8.11486 568 83.2194C568 126.142 548.967 234.873 548.967 234.873C548.967 234.873 568 343.604 568 386.527C568 477.862 491.566 468.135 444.879 436.083C379.759 387.194 309.719 288.065 284 234.873C258.281 288.065 188.241 387.194 123.121 436.083C76.4342 468.135 0 477.862 0 386.527C0 343.604 19.0327 234.873 19.0327 234.873C19.0327 234.873 0 126.142 0 83.2194C0 -8.11486 76.4342 1.61183 123.121 33.6637Z"/>
                  </svg>
                  <span>Bluesky</span>
                </Link>
              </li>
              
              {/* GitHub */}
              <li>
                <Link
                  href="https://github.com/kholterhoff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 hover:text-orange transition-colors"
                  aria-label="Follow on GitHub"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>GitHub</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

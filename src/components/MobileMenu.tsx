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
  useEffect(() => {
    if (isOpen) {
      onToggle()
    }
  }, [pathname, isOpen, onToggle])

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
        className={`fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
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

        {/* Menu Footer */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="border-t border-gray-200 pt-6">
            <Link
              href="https://twitter.com/KateHolterhoff"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-600 hover:text-orange transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
              <span>Follow on Twitter</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

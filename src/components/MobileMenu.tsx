import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { navigationItems } from '@/lib/navigation-items'
import { socialPlatforms } from '@/lib/social-platforms'

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
  pathname: string
}

export default function MobileMenu({ isOpen, onToggle, pathname }: MobileMenuProps) {
  const hasMounted = useRef(false)

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    if (isOpen) {
      onToggle()
    }
  }, [isOpen, onToggle, pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onToggle}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-[320px] bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden mobile-menu ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <Link href="/" className="text-xl font-bold" onClick={onToggle}>
            <span className="font-bold">kate</span>
            <span className="font-normal">holterhoff</span>
          </Link>

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

        <nav className="p-6">
          <ul className="space-y-6">
            {navigationItems.map((item, index) => {
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

        <div className="absolute bottom-6 left-6 right-6">
          <div className="border-t border-gray-200 pt-6">
            <ul className="flex flex-col space-y-4">
              {socialPlatforms.map((platform) => (
                <li key={platform.name}>
                  <a
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 text-gray-600 transition-colors hover:text-orange"
                    aria-label={`Follow on ${platform.name}`}
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox={platform.viewBox}>
                      <path d={platform.path} />
                    </svg>
                    <span>{platform.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

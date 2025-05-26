'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      <nav className="flex justify-between items-center p-4 md:p-6 relative z-50">
        <div className="flex items-center">
          {pathname !== '/' && (
            <Link href="/" className="text-xl md:text-2xl font-bold text-white">
              <span className="font-bold">kate</span>
              <span className="font-normal">holterhoff</span>
            </Link>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          <Link
            href="/"
            className={`nav-link text-base transition-colors ${
              pathname === '/'
                ? (isActive('/') ? 'font-bold text-white' : 'text-white/80 hover:text-white')
                : (isActive('/') ? 'font-bold text-orange' : 'text-gray-700 hover:text-orange')
            }`}
          >
            home
          </Link>
          <Link
            href="/analyst"
            className={`nav-link text-base transition-colors ${
              pathname === '/'
                ? 'text-white/80 hover:text-white'
                : (isActive('/analyst') ? 'font-bold text-orange' : 'text-gray-700 hover:text-orange')
            }`}
          >
            analyst
          </Link>
          <Link
            href="/academic"
            className={`nav-link text-base transition-colors ${
              pathname === '/'
                ? 'text-white/80 hover:text-white'
                : (isActive('/academic') ? 'font-bold text-coral' : 'text-gray-700 hover:text-orange')
            }`}
          >
            academic
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <HamburgerButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onToggle={closeMobileMenu}
      />
    </>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import HamburgerButton from './HamburgerButton'
import MobileMenu from './MobileMenu'
import { navigationItems } from '@/lib/navigation-items'

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((open) => !open)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

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

        <div className="hidden md:flex space-x-8">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const className = isHomePage
              ? isActive
                ? item.homeActiveClassName
                : item.homeInactiveClassName
              : isActive
                ? item.pageActiveClassName
                : item.pageInactiveClassName

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link text-base transition-colors ${className}`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        <div className="md:hidden">
          <HamburgerButton isHomePage={isHomePage} isOpen={isMobileMenuOpen} onClick={toggleMobileMenu} />
        </div>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onToggle={closeMobileMenu} pathname={pathname} />
    </>
  )
}

'use client'

import { usePathname } from 'next/navigation'

interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
}

export default function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  const pathname = usePathname()
  return (
    <button
      onClick={onClick}
      className={`hamburger-button p-2 rounded-md transition-colors duration-200 ${
        pathname === '/'
          ? 'hover:bg-white/10'
          : 'hover:bg-gray-100'
      }`}
      data-homepage={pathname === '/' ? 'true' : 'false'}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <div className="w-6 h-6 relative">
        {/* Top line */}
        <span
          className={`hamburger-line top-1 ${
            isOpen ? 'top-3 rotate-45' : ''
          }`}
        />

        {/* Middle line */}
        <span
          className={`hamburger-line top-3 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />

        {/* Bottom line */}
        <span
          className={`hamburger-line top-5 ${
            isOpen ? 'top-3 -rotate-45' : ''
          }`}
        />
      </div>
    </button>
  )
}

interface HamburgerButtonProps {
  isHomePage: boolean
  isOpen: boolean
  onClick: () => void
}

export default function HamburgerButton({ isHomePage, isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`hamburger-button p-2 rounded-md transition-colors duration-200 ${
        isHomePage ? 'hover:bg-white/10' : 'hover:bg-gray-100'
      }`}
      data-homepage={isHomePage ? 'true' : 'false'}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <div className="w-6 h-6 relative">
        <span
          className={`hamburger-line absolute top-1 ${
            isOpen ? 'top-3 rotate-45' : ''
          }`}
        />

        <span
          className={`hamburger-line absolute top-3 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />

        <span
          className={`hamburger-line absolute top-5 ${
            isOpen ? 'top-3 -rotate-45' : ''
          }`}
        />
      </div>
    </button>
  )
}

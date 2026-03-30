export interface NavigationItem {
  href: string
  label: string
  homeActiveClassName: string
  homeInactiveClassName: string
  pageActiveClassName: string
  pageInactiveClassName: string
}

export const navigationItems: NavigationItem[] = [
  {
    href: '/',
    label: 'home',
    homeActiveClassName: 'font-bold text-white',
    homeInactiveClassName: 'text-white/80 hover:text-white',
    pageActiveClassName: 'font-bold text-orange',
    pageInactiveClassName: 'text-gray-700 hover:text-orange',
  },
  {
    href: '/analyst',
    label: 'analyst',
    homeActiveClassName: 'text-white/80 hover:text-white',
    homeInactiveClassName: 'text-white/80 hover:text-white',
    pageActiveClassName: 'font-bold text-orange',
    pageInactiveClassName: 'text-gray-700 hover:text-orange',
  },
  {
    href: '/academic',
    label: 'academic',
    homeActiveClassName: 'text-white/80 hover:text-white',
    homeInactiveClassName: 'text-white/80 hover:text-white',
    pageActiveClassName: 'font-bold text-coral',
    pageInactiveClassName: 'text-gray-700 hover:text-orange',
  },
]

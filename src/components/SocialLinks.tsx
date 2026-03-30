import { socialPlatforms } from '@/lib/social-platforms'

interface SocialLinksProps {
  className?: string
}

export default function SocialLinks({ className = "" }: SocialLinksProps) {
  return (
    <div className={`social-links ${className}`}>
      <ul className="social-links__items flex space-x-4">
        {socialPlatforms.map((platform) => (
          <li key={platform.name} className="social-links__item">
            <a
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-links__item-link group relative inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label={`Follow on ${platform.name}`}
            >
              <span className="text-gray-600 group-hover:text-orange transition-colors duration-300">
                <svg className="w-6 h-6" fill="currentColor" viewBox={platform.viewBox}>
                  <path d={platform.path} />
                </svg>
              </span>

              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-coral/20 to-orange/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-coral to-orange opacity-0 group-hover:opacity-20 scale-75 group-hover:scale-100 transition-all duration-300 -z-20"></div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

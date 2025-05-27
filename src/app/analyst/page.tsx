import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import SocialLinks from '@/components/SocialLinks'
import RSSFeed from '@/components/RSSFeed'

export default function Analyst() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <p className="text-lg leading-relaxed">
              Kate is a principal analyst at <Link href="https://redmonk.com" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">RedMonk</Link>,
              where she focuses on developer tools, open source communities, and the intersection of technology and culture.
            </p>

            <p className="text-lg leading-relaxed">
              Her research examines how developers work, collaborate, and build communities around technology.
              She specializes in analyzing trends in programming languages, development tools, and developer experience.
            </p>

            <div className="mt-12">
              <RSSFeed />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <SocialLinks />
          <p className="text-sm text-gray-600">© 2025 Kate Holterhoff</p>

        </div>
      </footer>
    </div>
  )
}

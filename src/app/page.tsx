import Link from 'next/link'
import Image from "next/image";
import Navigation from '@/components/Navigation'
import TypingHeroTitle from '@/components/TypingHeroTitle'
import SocialLinks from '@/components/SocialLinks'
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section with Gradient Background */}
      <div className="hero-gradient">
        {/* Navigation */}
        <Navigation />

        {/* Hero Title */}
        <header className="py-16 md:py-24 text-center">
        <h1 className="text-4xl md:text-6xl text-white">
          <TypingHeroTitle />
        </h1>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
            {/* Profile Image */}
            <div className="flex justify-center fade-in-up delay-1">
              <div className="relative floating-content">
                <div className="profile-image-container">
                  <Image
                    src="/kate-profile-new.png"
                    alt="Kate Holterhoff"
                    width={300}
                    height={300}
                    className="profile-image"
                  />
                </div>
              </div>
            </div>

            {/* Bio Text */}
            <div className="space-y-4 fade-in-up delay-2">
              <p className="text-base md:text-lg leading-relaxed">
                Kate completed her Ph.D. in literary and cultural studies at Carnegie Mellon in 2016;
                she is currently an{' '}
                <Link
                  href="https://redmonk.com/team/kate-holterhoff/"
                  className="text-coral hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  analyst
                </Link>
                {' '}at RedMonk and an{' '}
                <Link
                  href="https://wcprogram.lmc.gatech.edu/people/person/kate-holterhoff"
                  className="text-coral hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  affiliated researcher
                </Link>
                {' '}at Georgia Tech.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center fade-in-up delay-3">
            <Link href="/academic" className="button-academic rounded-sm">
              <span className="slanted text-lg font-light">academic</span>
            </Link>
            <Link href="/analyst" className="button-analyst rounded-sm">
              <span className="slanted text-lg font-light">analyst</span>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 text-center">
        <div className="flex flex-col items-center space-y-4">
          <SocialLinks />
          <Footer />
        </div>
      </footer>
    </div>
  )
}

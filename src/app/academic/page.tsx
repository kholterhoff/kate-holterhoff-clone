import Link from 'next/link'
import Image from 'next/image'
import Navigation from '@/components/Navigation'
import SocialLinks from '@/components/SocialLinks'

export default function Academic() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <p className="text-lg leading-relaxed">
              Kate completed her Ph.D. in literary and cultural studies at Carnegie Mellon University in 2016.
              Her dissertation examined the intersection of digital humanities and computational methods in literary analysis.
            </p>

            <p className="text-lg leading-relaxed">
              She is currently an affiliated researcher at the <Link href="https://wcprogram.lmc.gatech.edu/" className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">Writing and Communication Program</Link> at Georgia Tech,
              where she continues her research on digital culture and technology.
            </p>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Research Interests</h2>
              <div className="space-y-4">
                <p className="text-base">
                  • Digital humanities and computational literary analysis
                </p>
                <p className="text-base">
                  • Technology and cultural studies
                </p>
                <p className="text-base">
                  • Writing and communication in digital contexts
                </p>
                <p className="text-base">
                  • Developer communities and technical communication
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Education</h2>
              <div className="space-y-4">
                <p className="text-base">
                  <strong>Ph.D. in Literary and Cultural Studies</strong><br />
                  Carnegie Mellon University, 2016
                </p>
              </div>
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

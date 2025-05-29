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

            <div id="research">
              <h2>Research &#38; Trends</h2>
              <ul> 
                <li><a href="https://redmonk.com/kholterhoff/category/frontend/">Frontend Engineering</a></li>
                <li><a href="https://redmonk.com/kholterhoff/category/ai/">AI/ML</a></li>
                <li><a href="https://redmonk.com/kholterhoff/category/upskilling/">Upskilling</a></li>
                <li><a href="https://redmonk.com/kholterhoff/category/messaging/">Messaging/MQs</a></li>
                <li><a href="https://redmonk.com/kholterhoff/category/open-source/">Open Source</a></li>
                <li><a href="https://redmonk.com/kholterhoff/category/devx/">DevX</a></li>   
                <li><a href="https://em360tech.com/podcast/honeycomb-measuring-success-incident-response-program">Observability</a></li>
                <li><a href="https://redmonk.com/kholterhoff/category/design/">Design</a></li>
              </ul>  
            </div>

              <h2>RedMonk Blog</h2>
            {/* RSS Feed Section */}
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

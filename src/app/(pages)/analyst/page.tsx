import RSSFeed from '@/components/RSSFeed'

export default function Analyst() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-8">

        <div id="research">
          <h2>Research</h2>
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
  )
}

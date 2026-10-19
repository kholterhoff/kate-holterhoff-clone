import FeedSection from '@/components/FeedSection'
import { getRSSPosts } from '@/lib/rss-feed'

export default async function RSSFeed() {
  const posts = await getRSSPosts()

  return () => {
      cancelled = true
    }
  }, [])

  return (
    <FeedSection
      title="Kate's RedMonk Blog: console.log()"
      items={posts}
      actionLabel="Read more"
      ctaHref="https://redmonk.com/kholterhoff/"
      ctaLabel="View All Posts"
      emptyMessage="Unable to load the latest RedMonk posts right now."
      emptyHref="https://redmonk.com/kholterhoff/"
      emptyLinkLabel="redmonk.com/kholterhoff"
      fallbackLabel="RM"
      imageWrapperClassName="relative h-64 overflow-hidden bg-gradient-to-br from-coral to-orange"
      imageClassName="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      bodyClassName="flex min-h-[16rem] flex-1 flex-col bg-black p-5 sm:p-6"
      titleClassName="mb-3 text-xl font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-[#ffd7c4]"
    />
  )
}

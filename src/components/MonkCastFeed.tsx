import FeedSection from '@/components/FeedSection'
import { getMonkCastPosts } from '@/lib/monkcast-feed'

export default async function MonkCastFeed() {
  const episodes = await getMonkCastPosts()

  return (
    <FeedSection
      title="The MonkCast"
      items={episodes}
      actionLabel="Open episode"
      ctaHref="https://monkcast.com/"
      ctaLabel="Visit MonkCast"
      emptyMessage="Unable to load MonkCast episodes right now."
      emptyHref="https://monkcast.com/"
      emptyLinkLabel="monkcast.com"
      fallbackLabel="MC"
      imageWrapperClassName="relative aspect-video w-full overflow-hidden bg-gradient-to-br from-coral to-orange"
      imageClassName="absolute inset-0 h-full w-full bg-black object-contain"
      bodyClassName="flex min-h-[12rem] flex-1 flex-col bg-black p-5 sm:p-6"
      titleClassName="mb-5 text-xl font-semibold leading-snug text-white transition-colors duration-200 group-hover:text-[#ffd7c4]"
      showDescription={false}
    />
  )
}

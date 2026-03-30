import { formatFeedDate, type FeedItem } from '@/lib/feed-utils'

interface FeedSectionProps {
  title?: string
  items: FeedItem[]
  actionLabel: string
  ctaHref: string
  ctaLabel: string
  emptyMessage: string
  emptyHref: string
  emptyLinkLabel: string
  fallbackLabel: string
  imageWrapperClassName: string
  imageClassName: string
  bodyClassName: string
  titleClassName: string
  showDescription?: boolean
}

export default function FeedSection({
  title,
  items,
  actionLabel,
  ctaHref,
  ctaLabel,
  emptyMessage,
  emptyHref,
  emptyLinkLabel,
  fallbackLabel,
  imageWrapperClassName,
  imageClassName,
  bodyClassName,
  titleClassName,
  showDescription = true,
}: FeedSectionProps) {
  if (items.length === 0) {
    return (
      <div className="w-full">
        {title ? (
          <div className="mb-6">
            <h1>{title}</h1>
          </div>
        ) : null}
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-red-600">{emptyMessage}</p>
          <p className="mt-2 text-sm text-gray-600">
            Visit{' '}
            <a href={emptyHref} className="text-coral hover:underline" target="_blank" rel="noopener noreferrer">
              {emptyLinkLabel}
            </a>{' '}
            directly
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {title ? (
        <div className="mb-6">
          <h1>{title}</h1>
        </div>
      ) : null}
      <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.link}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block h-full"
          >
            <div className="h-full rounded-[1.45rem] bg-gradient-to-br from-coral via-orange to-[#ffb48d] p-[3px] shadow-[0_22px_55px_-32px_rgba(245,122,73,0.7)] transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:scale-[1.01] group-hover:shadow-[0_30px_70px_-28px_rgba(245,122,73,0.9)]">
              <article className="flex h-full flex-col overflow-hidden rounded-[1.24rem] bg-black">
                <div className={imageWrapperClassName}>
                  <div
                    className={`absolute inset-0 items-center justify-center bg-gradient-to-br from-coral to-orange ${
                      item.image ? 'hidden' : 'flex'
                    }`}
                    data-fallback="true"
                  >
                    <span className="text-sm font-semibold tracking-[0.3em] text-white">{fallbackLabel}</span>
                  </div>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={imageClassName}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
                </div>
                <div className={bodyClassName}>
                  <time className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                    {formatFeedDate(item.pubDate)}
                  </time>

                  <h3 className={titleClassName}>{item.title}</h3>

                  {showDescription ? (
                    <p className="mb-5 line-clamp-3 text-sm leading-6 text-white/82">{item.description}</p>
                  ) : null}

                  <span className="mt-auto inline-flex items-center text-sm font-medium text-white/90 transition-colors group-hover:text-white">
                    {actionLabel}
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </article>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-coral to-orange px-6 py-3 font-medium text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {ctaLabel}
          <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  )
}

export interface FeedItem {
  title: string
  link: string
  description: string
  pubDate: string
  image?: string
  content?: string
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

export function truncateText(text: string, maxLength: number): string {
  if (!text) {
    return ''
  }

  return text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text
}

export function extractImageFromMarkup(markup: string): string | undefined {
  const imageMatch = markup.match(/<img[^>]+src=["']([^"'>]+)["'][^>]*>/i)
  return imageMatch?.[1]
}

export function formatFeedDate(dateString: string): string {
  try {
    const date = new Date(dateString)

    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return dateString
  }
}

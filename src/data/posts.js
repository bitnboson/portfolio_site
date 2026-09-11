const modules = import.meta.glob('/blog/*.md', { query: '?raw', import: 'default', eager: true })

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) {
    return { data: {}, content: raw }
  }

  const [, fm, content] = match
  const data = {}

  for (const line of fm.split(/\r?\n/)) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^"|"$/g, '').replace(/^'|'$/g, ''))
        .filter(Boolean)
    } else {
      value = value.replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1')
    }

    data[key] = value
  }

  return { data, content }
}

const posts = Object.entries(modules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    const slug = path.split('/').pop().replace(/\.md$/, '')
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
      tags: data.tags || [],
      cover: data.cover || null,
      content,
    }
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getAllPosts() {
  return posts
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug) || null
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function estimateReadingTime(content) {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getAllPosts, formatDate, estimateReadingTime } from '../data/posts'

export default function Blog() {
  const posts = getAllPosts()

  return (
    <div className="container-site py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="section-label">Blog</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
          Notes &amp; Write-ups
        </h1>
        <p className="text-neutral-400 max-w-xl">
          Ideas, tutorials, and things I'm learning along the way.
        </p>
      </motion.div>

      {posts.length === 0 ? (
        <div className="card-surface p-10 text-center text-neutral-400">
          No posts yet. Drop a markdown file in <code className="text-accent-soft">blog/</code> to publish.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="card-surface group flex flex-col overflow-hidden hover:border-accent/30 transition-colors duration-300"
            >
              {post.cover && (
                <Link to={`/blog/${post.slug}`} className="block relative h-40 overflow-hidden">
                  <img
                    src={post.cover}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
                </Link>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-3 text-xs text-neutral-500">
                  <span className="font-mono text-accent-soft">{formatDate(post.date)}</span>
                  <span>·</span>
                  <span>{estimateReadingTime(post.content)} min read</span>
                </div>

                <Link to={`/blog/${post.slug}`}>
                  <h2 className="font-display text-lg font-semibold text-white mb-2 group-hover:text-accent-soft transition-colors">
                    {post.title}
                  </h2>
                </Link>

                <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {post.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-accent/10 text-accent-soft border border-accent/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </div>
  )
}
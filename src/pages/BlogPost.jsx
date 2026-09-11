import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'
import { FiArrowLeft, FiCalendar, FiClock } from 'react-icons/fi'
import { getPostBySlug, formatDate, estimateReadingTime } from '../data/posts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <div className="container-site py-24 max-w-3xl text-center">
        <h1 className="font-display text-3xl font-bold text-white mb-4">Post not found</h1>
        <p className="text-neutral-400 mb-8">The article you're looking for doesn't exist.</p>
        <Link to="/blog" className="btn-ghost">
          <FiArrowLeft size={16} /> Back to Blog
        </Link>
      </div>
    )
  }

  return (
    <div className="container-site py-12 max-w-3xl">
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-accent-soft mb-8 transition-colors"
        >
          <FiArrowLeft size={16} /> Back to Blog
        </Link>

        {post.cover && (
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-64 sm:h-80 object-cover rounded-2xl border border-ink-700/60 mb-8"
          />
        )}

        <h1 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 mb-3">
          <span className="inline-flex items-center gap-2">
            <FiCalendar size={14} className="text-accent-soft" />
            {formatDate(post.date)}
          </span>
          <span className="inline-flex items-center gap-2">
            <FiClock size={14} className="text-accent-soft" />
            {estimateReadingTime(post.content)} min read
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2.5 py-1 rounded-md bg-accent/10 text-accent-soft border border-accent/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-neutral-300 prose-a:text-accent-soft prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-code:font-mono prose-blockquote:border-accent prose-blockquote:text-neutral-400 prose-pre:bg-ink-800 prose-pre:border prose-pre:border-ink-700/60 prose-hr:border-ink-700 prose-img:rounded-xl prose-img:border prose-img:border-ink-700/60 prose-table:border prose-table:border-ink-700 prose-th:bg-ink-800 prose-th:text-white prose-td:text-neutral-300 prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-th:border prose-th:border-ink-600 prose-td:border prose-td:border-ink-600 prose-table:text-sm prose-thead:bg-ink-800/50">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              a: (props) => (
                <a {...props} target="_blank" rel="noopener noreferrer" />
              ),
              img: (props) => <img {...props} loading="lazy" className="my-8 rounded-xl border border-ink-700/60 w-full" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="border-t border-ink-700/50 mt-12 pt-8 flex justify-between items-center">
          <Link to="/blog" className="btn-ghost">
            <FiArrowLeft size={16} /> All Posts
          </Link>
        </div>
      </motion.article>
    </div>
  )
}
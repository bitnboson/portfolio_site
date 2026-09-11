import { motion } from 'framer-motion'

export default function TimelineItem({ item, index, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative flex gap-6"
    >
      {/* Line */}
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-accent border-2 border-ink-900 ring-2 ring-accent/30 shrink-0 mt-1.5" />
        {!isLast && <div className="w-px flex-1 bg-ink-700" />}
      </div>

      {/* Content */}
      <div className="card-surface p-6 flex-1 mb-4 hover:border-accent/20 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
          <h3 className="font-display font-semibold text-white text-base">
            {item.role}
          </h3>
          <span className="text-xs font-mono text-accent-soft">{item.period}</span>
        </div>

        <p className="text-sm text-neutral-500 mb-3">{item.company}</p>
        <p className="text-sm text-neutral-400 leading-relaxed mb-4">{item.description}</p>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-mono px-2 py-1 rounded bg-ink-800 text-neutral-500"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
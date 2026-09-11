import { motion } from 'framer-motion'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

export default function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card-surface group p-6 flex flex-col justify-between hover:border-accent/30 transition-colors duration-300"
    >
      <div>
        <div className="flex items-start justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-white group-hover:text-accent-soft transition-colors">
            {project.title}
          </h3>
          <div className="flex gap-2 shrink-0 ml-4">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors" aria-label="GitHub">
                <FiGithub size={18} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-accent-soft transition-colors" aria-label="Live demo">
                <FiExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed mb-5">
          {project.description}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2.5 py-1 rounded-md bg-accent/10 text-accent-soft border border-accent/20"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
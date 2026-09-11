import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import ProjectCard from '../components/ProjectCard'

const categories = ['all', 'web', 'embedded', 'utility', 'desktop']

export default function Projects() {
  const [active, setActive] = useState('all')

  const filtered = active === 'all'
    ? projects
    : projects.filter((p) => p.category === active)

  return (
    <div className="container-site py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="section-label">Projects</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
          Things I've Built
        </h1>
        <p className="text-neutral-400 max-w-xl">
          A selection of projects I've worked on — from full-stack apps to AI
          experiments. Each one taught me something new.
        </p>
      </motion.div>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              active === cat
                ? 'bg-accent text-white'
                : 'bg-ink-800 text-neutral-400 hover:text-white hover:bg-ink-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {filtered.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </motion.div>
    </div>
  )
}
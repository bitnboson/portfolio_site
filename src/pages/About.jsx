import { motion } from 'framer-motion'
import { expertise, coreTechnologies, currentlyExploring, education } from '../data/skills'

export default function About() {
  return (
    <div className="container-site py-12 max-w-4xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <span className="section-label">About Me</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-6">
          Lokeshwaran P.
          <br />
          <span className="text-neutral-400 text-2xl sm:text-3xl font-medium block mt-2">
            Software Developer · Backend &amp; Embedded Systems
          </span>
        </h1>
        <div className="space-y-4 text-neutral-400 leading-relaxed max-w-2xl">
          <p>
            I'm a 4th year Computer Science student passionate about backend
            development, embedded systems, and creating efficient software
            solutions. I work at the intersection of hardware and software —
            building everything from enterprise IoT monitoring systems to
            self-hosted web dashboards.
          </p>
          <p>
            Previously, I worked as a Backend &amp; Embedded Engineer at{' '}
            <a
              href="https://emblocktech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-soft hover:underline"
            >
              EmBlock Tech
            </a>{' '}
            (2024 — Nov 2025), developing enterprise IoT monitoring solutions with
            ESP32, FreeRTOS, and real-time applications while architecting scalable
            backend infrastructure.
          </p>
          <p>
            My journey started in 2018 with Arduino and ESP32 boards, grew
            through Python and Qt desktop apps, and expanded into full-stack web
            development — a path that taught me to value what each layer of the
            stack brings to the table.
          </p>
        </div>
      </motion.div>

      {/* Expertise */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <h2 className="font-display text-2xl font-semibold text-white mb-6">
          Areas of Expertise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {expertise.map((area, i) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card-surface p-6 hover:border-accent/30 transition-colors"
            >
              <h3 className="font-display font-semibold text-white mb-2">{area.title}</h3>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                {area.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {area.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-2 py-1 rounded bg-ink-800 text-neutral-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Core technologies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <h2 className="font-display text-2xl font-semibold text-white mb-6">
          Core Technologies
        </h2>
        <div className="flex flex-wrap gap-2">
          {coreTechnologies.map((tech, i) => (
            <span
              key={tech}
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-ink-800 border border-ink-700/60 text-neutral-300 hover:border-accent/30 hover:text-accent-soft transition-all duration-200"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Currently exploring */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-14"
      >
        <h2 className="font-display text-2xl font-semibold text-white mb-6">
          Currently Exploring
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {currentlyExploring.map((item) => (
            <div key={item.name} className="card-surface p-6">
              <h3 className="font-display font-medium text-accent-soft text-sm uppercase tracking-wider mb-2">
                {item.name}
              </h3>
              <p className="text-sm text-neutral-400">{item.description}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-2xl font-semibold text-white mb-6">
          Education
        </h2>
        {education.map((edu) => (
          <div key={edu.degree} className="card-surface p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
              <h3 className="font-display font-semibold text-white">
                {edu.degree}
              </h3>
              <span className="text-xs font-mono text-accent-soft">{edu.period}</span>
            </div>
            <p className="text-sm text-neutral-500 mb-2">{edu.school}</p>
            <p className="text-sm text-neutral-400 leading-relaxed">{edu.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiArrowDownRight, FiGithub, FiLinkedin } from 'react-icons/fi'

export default function Home() {
  return (
    <section className="container-site flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl"
      >
        <span className="section-label mb-6 inline-block">Hello, I'm</span>

        <h1 className="font-display text-5xl sm:text-7xl font-bold tracking-tight text-gradient mb-4 leading-tight">
          Lokesh
        </h1>

        <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed mb-6">
          4th year{' '}
          <span className="text-white font-medium">Computer Science</span> student
          passionate about{' '}
          <span className="text-white font-medium">backend development</span>,{' '}
          <span className="text-white font-medium">embedded systems</span>, and
          creating efficient software solutions.
        </p>

        <p className="font-mono text-sm text-accent-soft mb-8">
          Software Developer — Backend &amp; Embedded Systems
        </p>

        <div className="flex flex-row items-center justify-center gap-3 mb-8">
          <a
            href="https://github.com/bitnboson"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <FiGithub size={18} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/lokeshwaran-prithivirajan-25a22128b"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <FiLinkedin size={18} /> LinkedIn
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/projects" className="btn-primary">
            View Projects <FiArrowRight size={18} />
          </Link>
          <Link to="/blog" className="btn-ghost">
            Read the Blog <FiArrowDownRight size={18} />
          </Link>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-20 text-neutral-600"
      >
        <FiArrowDownRight size={20} />
      </motion.div>
    </section>
  )
}
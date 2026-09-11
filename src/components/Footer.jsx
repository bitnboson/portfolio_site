import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'

export default function Footer() {
  return (
    <footer className="border-t border-ink-700/50 mt-20">
      <div className="container-site py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="font-display font-bold text-lg text-white">
            <span className="text-accent">{'<'}</span>Lokesh<span className="text-accent">{'/>'}</span>
          </span>
          <span className="text-xs text-neutral-500 flex items-center gap-1">
            Built with <FiHeart size={10} className="text-red-500" /> using React + Tailwind
          </span>
        </div>

        <nav className="flex items-center gap-2">
          <Link to="/projects" className="text-xs text-neutral-400 hover:text-accent-soft transition-colors px-2 py-1">
            Projects
          </Link>
          <Link to="/blog" className="text-xs text-neutral-400 hover:text-accent-soft transition-colors px-2 py-1">
            Blog
          </Link>
          <Link to="/contact" className="text-xs text-neutral-400 hover:text-accent-soft transition-colors px-2 py-1">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <a href="https://github.com/bitnboson" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
            <FiGithub size={16} />
          </a>
          <a href="https://www.linkedin.com/in/lokeshwaran-prithivirajan-25a22128b" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
            <FiLinkedin size={16} />
          </a>
          <a href="mailto:lokeshwaran.p2004@gmail.com" className="btn-icon" aria-label="Email">
            <FiMail size={16} />
          </a>
        </div>

        <span className="text-xs text-neutral-600">© {new Date().getFullYear()} Lokeshwaran P.</span>
      </div>
    </footer>
  )
}
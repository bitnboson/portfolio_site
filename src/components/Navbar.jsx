import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { FiGithub, FiLinkedin } from 'react-icons/fi'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/experience', label: 'Experience' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-ink-950/80 backdrop-blur-xl border-b border-ink-700/50 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="container-site flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="font-display font-bold text-xl tracking-tight text-white hover:text-accent-soft transition-colors">
          <span className="text-accent">{'<'}</span>Lokesh<span className="text-accent">{'/>'}</span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white bg-ink-800'
                    : 'text-neutral-400 hover:text-white hover:bg-ink-800/50'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop socials */}
        <div className="hidden md:flex items-center gap-2">
          <a href="https://github.com/bitnboson" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href="https://www.linkedin.com/in/lokeshwaran-prithivirajan-25a22128b" target="_blank" rel="noopener noreferrer" className="btn-icon" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-neutral-400 hover:text-white p-2"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-ink-900/95 backdrop-blur-xl border-b border-ink-700/50"
          >
            <div className="container-site py-4 flex flex-col gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-white bg-ink-800'
                        : 'text-neutral-400 hover:text-white hover:bg-ink-800/50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t border-ink-700/50">
                <a href="https://github.com/bitnboson" target="_blank" rel="noopener noreferrer" className="btn-icon">
                  <FiGithub size={18} />
                </a>
                <a href="https://www.linkedin.com/in/lokeshwaran-prithivirajan-25a22128b" target="_blank" rel="noopener noreferrer" className="btn-icon">
                  <FiLinkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
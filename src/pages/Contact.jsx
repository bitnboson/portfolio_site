import { motion } from 'framer-motion'
import { FiMail, FiMapPin } from 'react-icons/fi'
import { FiGithub, FiLinkedin } from 'react-icons/fi'
import ContactForm from '../components/ContactForm'

const socials = [
  { icon: FiGithub, label: 'GitHub', url: 'https://github.com/bitnboson', handle: '@bitnboson' },
  { icon: FiLinkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/lokeshwaran-prithivirajan-25a22128b', handle: 'Lokeshwaran P.' },
]

export default function Contact() {
  return (
    <div className="container-site py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="section-label">Contact</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
          Let's Connect
        </h1>
        <p className="text-neutral-400 max-w-xl">
          Have a project in mind, want to collaborate, or just want to say hi?
          Feel free to reach out — I'd love to hear from you.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3"
        >
          <ContactForm />
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-6"
        >
          <div className="card-surface p-5 space-y-4">
            <div className="flex items-center gap-3 text-neutral-300">
              <FiMail size={18} className="text-accent-soft shrink-0" />
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">Email</p>
                <a href="mailto:lokeshwaran.p2004@gmail.com" className="text-sm hover:text-accent-soft transition-colors">
                  lokeshwaran.p2004@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3 text-neutral-300">
              <FiMapPin size={18} className="text-accent-soft shrink-0" />
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mb-0.5">Location</p>
                <span className="text-sm">India</span>
              </div>
            </div>
          </div>

          <div className="card-surface p-5 space-y-3">
            <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Find me on</p>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-neutral-300 hover:text-accent-soft transition-colors group"
              >
                <s.icon size={18} className="shrink-0" />
                <div>
                  <span className="text-sm font-medium group-hover:text-accent-soft transition-colors">
                    {s.label}
                  </span>
                  <span className="text-xs text-neutral-600 ml-2">{s.handle}</span>
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
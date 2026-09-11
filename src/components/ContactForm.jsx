import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { FiSend, FiCheck, FiAlertCircle } from 'react-icons/fi'

export default function ContactForm() {
  const formRef = useRef(null)
  const [status, setStatus] = useState('idle')
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
      )
      setStatus('sent')
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-400 mb-1.5">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Lokesh"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-400 mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="lokesh@example.com"
            className="input-field"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-neutral-400 mb-1.5">
          Subject
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          value={formData.subject}
          onChange={handleChange}
          placeholder="Let's collaborate"
          className="input-field"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-neutral-400 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          value={formData.message}
          onChange={handleChange}
          placeholder="Tell me about your project or idea..."
          className="input-field resize-none"
        />
      </div>

      <motion.button
        type="submit"
        disabled={status === 'sending'}
        whileTap={{ scale: 0.97 }}
        className={`btn-primary w-full justify-center ${
          status === 'sending' ? 'opacity-70 cursor-not-allowed' : ''
        } ${status === 'sent' ? '!bg-green-600 hover:!bg-green-600' : ''} ${
          status === 'error' ? '!bg-red-600 hover:!bg-red-600' : ''
        }`}
      >
        {status === 'idle' && (
          <>
            Send Message <FiSend size={16} />
          </>
        )}
        {status === 'sending' && 'Sending...'}
        {status === 'sent' && (
          <>
            Sent! <FiCheck size={16} />
          </>
        )}
        {status === 'error' && (
          <>
            Failed <FiAlertCircle size={16} />
          </>
        )}
      </motion.button>
    </form>
  )
}
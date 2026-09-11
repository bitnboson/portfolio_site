import { motion } from 'framer-motion'
import { experience } from '../data/experience'
import TimelineItem from '../components/TimelineItem'

export default function Experience() {
  return (
    <div className="container-site py-12 max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <span className="section-label">Experience</span>
        <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mt-3 mb-4">
          My Journey
        </h1>
        <p className="text-neutral-400 max-w-xl">
          From soldering LEDs on an Arduino to shipping enterprise IoT systems —
          here's how I got here.
        </p>
      </motion.div>

      <div>
        {experience.map((item, i) => (
          <TimelineItem
            key={item.role}
            item={item}
            index={i}
            isLast={i === experience.length - 1}
          />
        ))}
      </div>
    </div>
  )
}
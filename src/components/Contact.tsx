import { motion } from 'framer-motion'
import { Linkedin, ArrowUpRight } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
            Interested in working together, mentoring, or a speaking opportunity? Reach out on LinkedIn.
          </p>

          <a
            href="https://www.linkedin.com/in/antoniocarcagnì/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-bold rounded-lg transition-all hover:scale-105"
          >
            <Linkedin size={22} />
            Connect on LinkedIn
            <ArrowUpRight size={20} />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="border-t border-ocean-600/30 bg-ocean-800/50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-3">Antonio Carcagnì</h3>
            <p className="text-gray-400 text-sm">Digital & IT Leader | Cloud Architecture | Digital Transformation</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="#about" className="text-gray-400 hover:text-teal-400 transition">About</a><br/>
              <a href="#projects" className="text-gray-400 hover:text-teal-400 transition">Projects</a><br/>
              <a href="#contact" className="text-gray-400 hover:text-teal-400 transition">Contact</a>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-3">Tech Stack</h4>
            <p className="text-gray-400 text-sm">React • TypeScript • Tailwind • Supabase</p>
          </div>
        </div>

        <motion.div
          className="border-t border-ocean-600/30 pt-6 text-center text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>© 2024 Antonio Carcagnì. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}

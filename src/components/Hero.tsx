import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  }

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4">
      <motion.div
        className="text-center max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name */}
        <motion.div variants={itemVariants}>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
            Antonio Carcagnì
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl md:text-4xl text-teal-400 font-light mb-6">
            Driving Digital Transformation & Organizational Innovation
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            8+ years shaping the future of enterprise digital ecosystems. Strategic leader in cloud architecture, organizational transformation, and cross-functional team building at scale.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-bold rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-2">
            Explore My Work
            <ArrowRight size={20} />
          </button>
          <a
            href="#contact"
            className="px-8 py-4 border-2 border-teal-400 text-teal-400 hover:bg-teal-400/10 font-bold rounded-lg transition-all hover:scale-105"
          >
            Get in Touch
          </a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <p className="text-gray-400 text-sm">Scroll to explore</p>
        </motion.div>
      </motion.div>
    </section>
  )
}

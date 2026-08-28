import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="py-20 px-4 bg-ocean-800/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">About Me</h2>
          
          <div className="space-y-6 text-gray-200 text-lg leading-relaxed">
            <p>
              I'm a strategic technology leader with a passion for transforming organizations through digital innovation and cloud architecture. With 8+ years of experience spanning international environments at Engie, BIP Consulting, and Vodafone, I've orchestrated digital transformations managing budgets in the millions and leading cross-functional teams across multiple continents.
            </p>

            <p>
              My expertise spans enterprise cloud architecture, organizational change management, agile transformation, and building high-performing teams. I've architected scalable solutions, mentored emerging leaders, and championed digital-first strategies that drove measurable business impact.
            </p>

            <p>
              Beyond the boardroom, I'm deeply passionate about game development, emerging cloud technologies, and mentoring the next generation of tech leaders. I hold multiple AWS certifications and am an authorized instructor, committed to staying at the forefront of technological innovation.
            </p>

            <p className="text-teal-400">
              Currently: <span className="text-white font-semibold">Digital Customer Operations Manager at Engie</span>, orchestrating digital transformation across customer touchpoints and enterprise systems.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

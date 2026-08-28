import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

export default function Certifications() {
  const certs = [
    {
      title: 'AWS Certified Solutions Architect - Associate',
      issuer: 'Amazon Web Services',
      year: '2023-2025',
    },
    {
      title: 'Professional Scrum Master I',
      issuer: 'Scrum.org',
      year: '2021-Present',
    },
    {
      title: 'AWS Authorized Instructor',
      issuer: 'Amazon Web Services',
      year: '2023-Present',
    },
    {
      title: 'Cyber Security Foundation',
      issuer: 'EXIN',
      year: '2022-Present',
    },
    {
      title: 'SAFe Program Consultant',
      issuer: 'Scaled Agile',
      year: '2022-Present',
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-12">Certifications</h2>

          <div className="space-y-4">
            {certs.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 p-4 bg-ocean-700/50 backdrop-blur rounded-lg border border-ocean-600/30 hover:border-teal-400/30 transition-all"
              >
                <Award className="text-teal-400 flex-shrink-0 mt-1" size={24} />
                <div className="flex-grow">
                  <h3 className="text-white font-bold text-lg">{cert.title}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-gray-400 text-sm">{cert.issuer}</p>
                    <p className="text-teal-400 text-sm font-semibold">{cert.year}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

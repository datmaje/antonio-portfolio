import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { client, Certification } from '../lib/sanity'

const fallbackCerts: Certification[] = [
  { _id: '1', title: 'AWS Certified Solutions Architect - Associate', issuer: 'Amazon Web Services', validFrom: '2023', validTo: '2025' },
  { _id: '2', title: 'Professional Scrum Master I', issuer: 'Scrum.org', validFrom: '2021', validTo: 'Present' },
  { _id: '3', title: 'AWS Authorized Instructor', issuer: 'Amazon Web Services', validFrom: '2023', validTo: 'Present' },
  { _id: '4', title: 'Cyber Security Foundation', issuer: 'EXIN', validFrom: '2022', validTo: 'Present' },
  { _id: '5', title: 'SAFe Program Consultant', issuer: 'Scaled Agile', validFrom: '2022', validTo: 'Present' },
]

export default function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      const query = `*[_type == "certification"] | order(order asc){ _id, title, issuer, validFrom, validTo, order }`
      const data = await client.fetch(query)
      setCerts(data && data.length ? data : fallbackCerts)
    } catch (error) {
      console.error('Error fetching certifications:', error)
      setCerts(fallbackCerts)
    } finally {
      setLoading(false)
    }
  }

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

          {loading ? (
            <div className="text-gray-400 text-center py-12">Loading certifications...</div>
          ) : (
            <div className="space-y-4">
              {certs.map((cert, index) => (
                <motion.div
                  key={cert._id}
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
                      <p className="text-teal-400 text-sm font-semibold">
                        {cert.validFrom}
                        {cert.validTo ? `-${cert.validTo}` : ''}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

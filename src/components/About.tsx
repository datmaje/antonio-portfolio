import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { client, About as AboutContent } from '../lib/sanity'

const fallbackTitle = 'About Me'
const fallbackParagraphs = [
  "I'm a strategic technology leader with a passion for transforming organizations through digital innovation and cloud architecture. With 8+ years of experience spanning international environments at Engie, BIP Consulting, and Vodafone, I've orchestrated digital transformations managing budgets in the millions and leading cross-functional teams across multiple continents.",
  "My expertise spans enterprise cloud architecture, organizational change management, agile transformation, and building high-performing teams. I've architected scalable solutions, mentored emerging leaders, and championed digital-first strategies that drove measurable business impact.",
  "Beyond the boardroom, I'm deeply passionate about game development, emerging cloud technologies, and mentoring the next generation of tech leaders. I hold multiple AWS certifications and am an authorized instructor, committed to staying at the forefront of technological innovation.",
]

export default function About() {
  const [about, setAbout] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAbout()
  }, [])

  const fetchAbout = async () => {
    try {
      const query = `*[_type == "about"][0]{ _id, title, content }`
      const data = await client.fetch(query)
      setAbout(data && data.content && data.content.length ? data : null)
    } catch (error) {
      console.error('Error fetching about:', error)
      setAbout(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="about" className="py-20 px-4 bg-ocean-800/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">{about?.title || fallbackTitle}</h2>

          {loading ? (
            <div className="text-gray-400">Loading...</div>
          ) : (
            <div className="space-y-6 text-gray-200 text-lg leading-relaxed [&_a]:text-teal-400 [&_strong]:text-white">
              {about ? (
                <PortableText value={about.content} />
              ) : (
                fallbackParagraphs.map((p, i) => <p key={i}>{p}</p>)
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

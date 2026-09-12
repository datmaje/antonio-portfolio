import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PortableText } from '@portabletext/react'
import { client, About as AboutContent } from '../lib/sanity'
import { withYears } from '../lib/experience'

const fallbackTitle = 'About Me'

// Allineato al testo su Sanity. Serve solo se il CMS non risponde.
// {{years}} viene sostituito con gli anni di esperienza alla data della visita.
const fallbackParagraphs = [
  'Digital & IT leader with {{years}}+ years of experience driving IT transformation and digital product delivery across international environments.',
  'My background spans strategic planning, cross-functional team leadership, budgeting on multi-million programme portfolios, and change management, underpinned by AWS Solutions Architect Associate and Professional Scrum Master I certifications. I focus on what moves the needle for the business: cost, risk, and delivery time, and filter out the noise.',
  'Core expertise: IT transformation and digital product delivery, infrastructure and cloud architecture, Agile/SAFe delivery, team leadership and stakeholder management, vendor and contract management, change management and process reengineering.',
]

// Sostituisce gli anni anche nel testo che arriva dal CMS, senza toccare il resto dei blocchi.
function applyYears(content: any[]): any[] {
  if (!Array.isArray(content)) return content
  return content.map((block) =>
    block && Array.isArray(block.children)
      ? {
          ...block,
          children: block.children.map((child: any) =>
            child && typeof child.text === 'string' ? { ...child, text: withYears(child.text) } : child
          ),
        }
      : block
  )
}

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
                <PortableText value={applyYears(about.content)} />
              ) : (
                fallbackParagraphs.map((p, i) => <p key={i}>{withYears(p)}</p>)
              )}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

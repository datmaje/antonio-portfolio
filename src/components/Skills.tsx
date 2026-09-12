import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Cloud,
  Code2,
  Users,
  Zap,
  Database,
  Settings,
  Sparkles,
  Receipt,
  Smartphone,
  Gauge,
  Briefcase,
} from 'lucide-react'
import { client, Skill } from '../lib/sanity'

const iconMap: Record<string, typeof Cloud> = {
  Cloud,
  Code2,
  Users,
  Zap,
  Database,
  Settings,
  Receipt,
  Smartphone,
  Gauge,
  Briefcase,
  // lucide-react 0.292 non ha Handshake: se un documento Sanity lo usa, ricade su Briefcase
  Handshake: Briefcase,
}

// Allineato ai documenti "skill" su Sanity. Serve solo se il CMS non risponde.
const fallbackSkills: Skill[] = [
  {
    _id: '1',
    category: 'Meter-to-Cash',
    icon: 'Receipt',
    order: 1,
    skills: ['Metering & MDM', 'Billing & invoicing', 'Credit & collections', 'Market processes', 'Regulatory compliance'],
  },
  {
    _id: '2',
    category: 'Digital Products & Channels',
    icon: 'Smartphone',
    order: 2,
    skills: ['Mobile app ownership', 'Web self-service', 'CRM & campaigns', 'Voice of customer', 'Adoption & conversion'],
  },
  {
    _id: '3',
    category: 'IT & Business Governance',
    icon: 'Gauge',
    order: 3,
    skills: ['Operating model', 'Lean portfolio management', 'Demand & prioritisation', 'Delivery KPIs', 'Technical debt'],
  },
  {
    _id: '4',
    category: 'Delivery & Ways of Working',
    icon: 'Settings',
    order: 4,
    skills: ['Agile & SAFe at scale', 'Release management', 'Time-to-market', 'PMO & reporting', 'Distributed teams'],
  },
  {
    _id: '5',
    category: 'Cloud & Data Platforms',
    icon: 'Cloud',
    order: 5,
    skills: ['AWS', 'GCP', 'Cloud migration', 'DevOps & application lifecycle', 'Lakehouse & analytics'],
  },
  {
    _id: '6',
    category: 'Vendor & Contract Management',
    icon: 'Briefcase',
    order: 6,
    skills: ['Tenders & RFP', 'SLA & penalties', 'Contract governance', 'BPO management', 'Vendor performance'],
  },
]

export default function Skills() {
  const [skillCategories, setSkillCategories] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const query = `*[_type == "skill"] | order(order asc){ _id, category, skills, icon, order }`
      const data = await client.fetch(query)
      setSkillCategories(data && data.length ? data : fallbackSkills)
    } catch (error) {
      console.error('Error fetching skills:', error)
      setSkillCategories(fallbackSkills)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="skills" className="py-20 px-4 bg-ocean-800/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-12">Skills & Expertise</h2>

          {loading ? (
            <div className="text-gray-400 text-center py-12">Loading skills...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skillCategories.map((category, index) => {
                const Icon = iconMap[category.icon || ''] || Sparkles
                return (
                  <motion.div
                    key={category._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-ocean-700/50 backdrop-blur p-6 rounded-lg border border-ocean-600/30 hover:border-teal-400/50 transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="text-teal-400" size={28} />
                      <h3 className="text-xl font-bold text-white">{category.category}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-teal-400/10 border border-teal-400/30 text-teal-300 text-sm rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, Hobby } from '../lib/sanity'
import { Sparkles } from 'lucide-react'

export default function Hobbies() {
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHobbies()
  }, [])

  const fetchHobbies = async () => {
    try {
      const query = `*[_type == "hobby"] | order(order asc) {
        _id,
        title,
        description,
        order
      }`
      const data = await client.fetch(query)
      setHobbies(data || [])
    } catch (error) {
      console.error('Error fetching hobbies:', error)
      setHobbies([
        {
          _id: '1',
          title: 'Cloud Technologies & AWS',
          description: 'Exploring emerging AWS technologies, staying at the forefront of cloud innovation and infrastructure evolution.',
          order: 1,
        },
        {
          _id: '2',
          title: 'Game Development & Indie Gaming',
          description: 'Passionate about game design, creative direction, and the indie gaming ecosystem. Co-founder of a successful Steam title.',
          order: 2,
        },
        {
          _id: '3',
          title: 'Tech Mentoring & Leadership',
          description: 'Mentoring aspiring cloud architects and technology leaders. Committed to developing the next generation of innovators.',
          order: 3,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 bg-ocean-800/50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-12">Interests & Hobbies</h2>

          {loading ? (
            <div className="text-gray-400 text-center py-12">Loading interests...</div>
          ) : (
            <div className="space-y-4">
              {hobbies.map((hobby, index) => (
                <motion.div
                  key={hobby._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-ocean-700/50 backdrop-blur rounded-lg border border-ocean-600/30 hover:border-teal-400/30 transition-all"
                >
                  <Sparkles className="text-teal-400 flex-shrink-0 mt-1" size={24} />
                  <div className="flex-grow">
                    <h3 className="text-white font-bold text-lg mb-1">{hobby.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{hobby.description}</p>
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

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { client, urlFor, Project } from '../lib/sanity'
import { ExternalLink } from 'lucide-react'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const query = `*[_type == "project"] | order(order asc) {
        _id,
        title,
        description,
        image,
        link,
        order,
        publishedAt
      }`
      const data = await client.fetch(query)
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
      // Fallback projects if DB fails
      setProjects([
        {
          _id: '1',
          title: 'The Way Of Life',
          description: '1M+ downloads on Steam. Indie game with strategic gameplay design and successful crowdfunding campaign.',
          link: 'https://store.steampowered.com',
          order: 1,
          publishedAt: new Date().toISOString(),
        },
        {
          _id: '2',
          title: 'Engie App',
          description: 'B2C mobile application for iOS and Android. Directed cloud operations, DevOps adoption, and full lifecycle management.',
          link: 'https://engie.com',
          order: 2,
          publishedAt: new Date().toISOString(),
        },
        {
          _id: '3',
          title: 'Engie Customer Portal',
          description: 'Enterprise e-commerce platform serving 60+ sites. Managed digital customer touchpoints and experience orchestration.',
          link: 'https://engie.com',
          order: 3,
          publishedAt: new Date().toISOString(),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-12">Featured Projects</h2>

          {loading ? (
            <div className="text-gray-400 text-center py-12">Loading projects...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="bg-ocean-700/50 backdrop-blur rounded-lg overflow-hidden border border-ocean-600/30 hover:border-teal-400/50 transition-all"
                >
                  <div className="relative h-48 overflow-hidden bg-ocean-800">
                    {project.image ? (
                      <img
                        src={urlFor(project.image).width(500).height(300).url()}
                        alt={project.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-ocean-700 to-ocean-900" />
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold text-sm"
                    >
                      View Project
                      <ExternalLink size={16} />
                    </a>
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

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { client, projectCardFields, Project } from '../lib/sanity'
import ProjectCard from './ProjectCard'

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `{
          "featured": *[_type == "project" && featured == true] | order(order asc) { ${projectCardFields} },
          "total": count(*[_type == "project"])
        }`
        const data = await client.fetch(query)
        setProjects(data?.featured || [])
        setTotal(data?.total || 0)
      } catch (error) {
        console.error('Error fetching projects:', error)
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

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
          ) : projects.length === 0 ? (
            <div className="text-gray-400 text-center py-12">No projects published yet.</div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
                {projects.map((project, index) => (
                  <ProjectCard key={project._id} project={project} index={index} />
                ))}
              </div>

              {total > projects.length && (
                <div className="mt-10 text-center">
                  <Link
                    to="/projects"
                    className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold text-sm"
                  >
                    All projects ({total})
                    <ArrowRight size={16} />
                  </Link>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

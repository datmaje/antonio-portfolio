import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { client, projectCardFields, Project } from '../lib/sanity'
import ProjectCard from '../components/ProjectCard'

const CLUSTER_ORDER = [
  'Direct Product Ownership',
  'Meter-to-Cash',
  'Data & AI',
  'Governance & Delivery',
  'Earlier Career',
  'Side Ventures',
]

export default function ProjectsIndex() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const query = `*[_type == "project"] | order(order asc) { ${projectCardFields} }`
        setProjects((await client.fetch(query)) || [])
      } catch (error) {
        console.error('Error fetching projects:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  const clusters = [
    ...CLUSTER_ORDER.filter((c) => projects.some((p) => p.cluster === c)),
    ...Array.from(
      new Set(projects.map((p) => p.cluster).filter((c): c is string => !!c && !CLUSTER_ORDER.includes(c)))
    ),
  ]
  const uncategorised = projects.filter((p) => !p.cluster)

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-700 via-ocean-800 to-ocean-900 pt-24 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm mb-8">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <h1 className="text-4xl font-bold text-white mb-3">All projects</h1>
        <p className="text-gray-400 mb-12">
          {loading ? 'Loading…' : `${projects.length} case${projects.length === 1 ? '' : 's'} across the portfolio.`}
        </p>

        {clusters.map((cluster) => (
          <section key={cluster} className="mb-14">
            <h2 className="text-sm uppercase tracking-wider text-teal-300/90 mb-6">{cluster}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {projects
                .filter((p) => p.cluster === cluster)
                .map((project, index) => (
                  <ProjectCard key={project._id} project={project} index={index} />
                ))}
            </div>
          </section>
        ))}

        {uncategorised.length > 0 && (
          <section className="mb-14">
            <h2 className="text-sm uppercase tracking-wider text-teal-300/90 mb-6">Other</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {uncategorised.map((project, index) => (
                <ProjectCard key={project._id} project={project} index={index} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

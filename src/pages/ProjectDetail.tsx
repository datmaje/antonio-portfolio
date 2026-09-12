import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { client, projectDetailFields, publishedProject, urlFor, Project } from '../lib/sanity'

function Section({ title, body }: { title: string; body?: string }) {
  if (!body) return null
  return (
    <section className="mb-10">
      <h2 className="text-sm uppercase tracking-wider text-teal-300/90 mb-3">{title}</h2>
      {body.split('\n').filter(Boolean).map((paragraph, i) => (
        <p key={i} className="text-gray-300 leading-relaxed mb-3">
          {paragraph}
        </p>
      ))}
    </section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true)
      try {
        const query = `*[${publishedProject} && slug.current == $slug][0] { ${projectDetailFields} }`
        setProject(await client.fetch(query, { slug }))
      } catch (error) {
        console.error('Error fetching project:', error)
        setProject(null)
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
    window.scrollTo(0, 0)
  }, [slug])

  const meta = project
    ? [project.organization, project.role, project.period, project.location].filter(Boolean)
    : []

  // Da zero a N link: si usa "links" se popolato, altrimenti il vecchio campo "link" singolo.
  const publicLinks =
    project?.links && project.links.length
      ? project.links.filter((item) => item?.url)
      : project?.link
      ? [{ _key: 'legacy', label: 'Visit the product', url: project.link }]
      : []

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-700 via-ocean-800 to-ocean-900 pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link to="/projects" className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 text-sm mb-8">
          <ArrowLeft size={16} />
          All projects
        </Link>

        {loading ? (
          <div className="text-gray-400 py-12">Loading…</div>
        ) : !project ? (
          <div className="py-12">
            <h1 className="text-2xl font-bold text-white mb-3">Project not found</h1>
            <p className="text-gray-400">This case is not published, or the address is wrong.</p>
          </div>
        ) : (
          <motion.article initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {project.cluster && (
              <span className="inline-block mb-4 text-[11px] uppercase tracking-wider text-teal-300/90 bg-ocean-600/50 px-2 py-1 rounded">
                {project.cluster}
              </span>
            )}

            <h1 className="text-4xl font-bold text-white mb-4">{project.title}</h1>
            <p className="text-lg text-gray-200 mb-6">{project.description}</p>

            {meta.length > 0 && (
              <p className="text-sm text-gray-400 border-l-2 border-ocean-600 pl-4 mb-8">{meta.join(' · ')}</p>
            )}

            {project.image && (
              <img
                src={urlFor(project.image).width(900).url()}
                alt={project.title}
                className="w-full rounded-lg border border-ocean-600/30 mb-10"
              />
            )}

            <Section title="Context" body={project.context} />
            <Section title="Role" body={project.roleDetail} />
            <Section title="Scope" body={project.scope} />
            <Section title="Economics" body={project.economics} />
            <Section title="FTE" body={project.fte} />
            <Section title="Stakeholders" body={project.stakeholders} />
            <Section title="Tech & Tools" body={project.techTools} />
            <Section title="Results" body={project.results} />

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-ocean-600/30">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-gray-400 border border-ocean-600/60 rounded px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {publicLinks.length > 0 && (
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-8">
                {publicLinks.map((item) => (
                  <a
                    key={item._key || item.url}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold text-sm"
                  >
                    {item.label}
                    <ExternalLink size={16} />
                  </a>
                ))}
              </div>
            )}
          </motion.article>
        )}
      </div>
    </div>
  )
}

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { urlFor, Project } from '../lib/sanity'

interface Props {
  project: Project
  index?: number
}

export default function ProjectCard({ project, index = 0 }: Props) {
  const to = project.slug ? `/projects/${project.slug}` : '#'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: Math.min(index, 6) * 0.08 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Link
        to={to}
        className="flex h-full flex-col bg-ocean-700/50 backdrop-blur rounded-lg overflow-hidden border border-ocean-600/30 hover:border-teal-400/50 transition-all"
      >
        {project.image && (
          <div className="relative h-40 overflow-hidden bg-ocean-800">
            <img
              src={urlFor(project.image).width(500).height(300).url()}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-6">
          {project.cluster && (
            <span className="self-start mb-3 text-[11px] uppercase tracking-wider text-teal-300/90 bg-ocean-600/50 px-2 py-1 rounded">
              {project.cluster}
            </span>
          )}

          <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>

          {(project.organization || project.period) && (
            <p className="text-xs text-gray-400 mb-3">
              {[project.organization, project.period].filter(Boolean).join(' · ')}
            </p>
          )}

          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-[11px] text-gray-400 border border-ocean-600/60 rounded px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <span className="mt-auto inline-flex items-center gap-2 text-teal-400 font-semibold text-sm">
            Read the case
            <ArrowRight size={16} />
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

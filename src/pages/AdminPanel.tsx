import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase, Project, Hobby, Lead } from '../lib/supabase'
import { LogOut, Plus, Trash2, Edit2, Mail } from 'lucide-react'

type Tab = 'projects' | 'hobbies' | 'leads'

export default function AdminPanel() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<Tab>('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingHobby, setEditingHobby] = useState<Hobby | null>(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showHobbyForm, setShowHobbyForm] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [projectsRes, hobbiesRes, leadsRes] = await Promise.all([
        supabase.from('projects').select('*').order('order_index'),
        supabase.from('hobbies').select('*').order('order_index'),
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
      ])

      if (projectsRes.data) setProjects(projectsRes.data)
      if (hobbiesRes.data) setHobbies(hobbiesRes.data)
      if (leadsRes.data) setLeads(leadsRes.data)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  // Projects Management
  const handleAddProject = async (e: React.FormEvent, data: Partial<Project>) => {
    e.preventDefault()
    const maxOrder = Math.max(...projects.map(p => p.order_index), 0)
    
    const { error } = await supabase.from('projects').insert([{
      ...data,
      order_index: maxOrder + 1,
    }])

    if (!error) {
      loadData()
      setShowProjectForm(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (confirm('Delete this project?')) {
      await supabase.from('projects').delete().eq('id', id)
      loadData()
    }
  }

  // Hobbies Management
  const handleAddHobby = async (e: React.FormEvent, data: Partial<Hobby>) => {
    e.preventDefault()
    const maxOrder = Math.max(...hobbies.map(h => h.order_index), 0)
    
    const { error } = await supabase.from('hobbies').insert([{
      ...data,
      order_index: maxOrder + 1,
    }])

    if (!error) {
      loadData()
      setShowHobbyForm(false)
    }
  }

  const handleDeleteHobby = async (id: string) => {
    if (confirm('Delete this hobby?')) {
      await supabase.from('hobbies').delete().eq('id', id)
      loadData()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-700 via-ocean-800 to-ocean-900 pt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white">CMS Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-ocean-600/30">
          {(['projects', 'hobbies', 'leads'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-semibold transition-all ${
                activeTab === tab
                  ? 'text-teal-400 border-b-2 border-teal-400'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-center text-gray-400">Loading...</div>
        ) : (
          <>
            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button
                  onClick={() => setShowProjectForm(!showProjectForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-bold rounded-lg mb-6 transition"
                >
                  <Plus size={18} />
                  Add Project
                </button>

                {showProjectForm && <ProjectForm onSubmit={handleAddProject} />}

                <div className="space-y-4">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-ocean-700/50 backdrop-blur rounded-lg p-4 border border-ocean-600/30 flex justify-between items-start"
                    >
                      <div className="flex-grow">
                        <h3 className="text-white font-bold text-lg">{project.title}</h3>
                        <p className="text-gray-300 text-sm">{project.description}</p>
                        <p className="text-teal-400 text-xs mt-2">{project.link_url}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-ocean-600 rounded transition">
                          <Edit2 size={18} className="text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project.id)}
                          className="p-2 hover:bg-red-600/20 rounded transition"
                        >
                          <Trash2 size={18} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Hobbies Tab */}
            {activeTab === 'hobbies' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <button
                  onClick={() => setShowHobbyForm(!showHobbyForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-bold rounded-lg mb-6 transition"
                >
                  <Plus size={18} />
                  Add Hobby
                </button>

                {showHobbyForm && <HobbyForm onSubmit={handleAddHobby} />}

                <div className="space-y-4">
                  {hobbies.map((hobby) => (
                    <div
                      key={hobby.id}
                      className="bg-ocean-700/50 backdrop-blur rounded-lg p-4 border border-ocean-600/30 flex justify-between items-start"
                    >
                      <div className="flex-grow">
                        <h3 className="text-white font-bold text-lg">{hobby.title}</h3>
                        <p className="text-gray-300 text-sm">{hobby.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-ocean-600 rounded transition">
                          <Edit2 size={18} className="text-gray-400" />
                        </button>
                        <button
                          onClick={() => handleDeleteHobby(hobby.id)}
                          className="p-2 hover:bg-red-600/20 rounded transition"
                        >
                          <Trash2 size={18} className="text-red-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Leads Tab */}
            {activeTab === 'leads' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="bg-ocean-700/50 backdrop-blur rounded-lg border border-ocean-600/30 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-ocean-800/50 border-b border-ocean-600/30">
                        <tr>
                          <th className="px-4 py-3 text-left text-teal-400 font-semibold">Name</th>
                          <th className="px-4 py-3 text-left text-teal-400 font-semibold">Email</th>
                          <th className="px-4 py-3 text-left text-teal-400 font-semibold">Company</th>
                          <th className="px-4 py-3 text-left text-teal-400 font-semibold">Type</th>
                          <th className="px-4 py-3 text-left text-teal-400 font-semibold">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.map((lead) => (
                          <tr key={lead.id} className="border-b border-ocean-600/30 hover:bg-ocean-800/30 transition">
                            <td className="px-4 py-3 text-white">{lead.name}</td>
                            <td className="px-4 py-3">
                              <a href={`mailto:${lead.email}`} className="text-teal-400 hover:underline flex items-center gap-1">
                                <Mail size={14} /> {lead.email}
                              </a>
                            </td>
                            <td className="px-4 py-3 text-gray-300">{lead.company || '-'}</td>
                            <td className="px-4 py-3 text-gray-300 text-sm">{lead.request_type}</td>
                            <td className="px-4 py-3 text-gray-400 text-sm">{new Date(lead.created_at).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {leads.length === 0 && (
                    <div className="p-8 text-center text-gray-400">No leads yet</div>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function ProjectForm({ onSubmit }: { onSubmit: (e: React.FormEvent, data: Partial<Project>) => void }) {
  const [data, setData] = useState({ title: '', description: '', image_url: '', link_url: '' })

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e, data)
        setData({ title: '', description: '', image_url: '', link_url: '' })
      }}
      className="bg-ocean-700/50 backdrop-blur rounded-lg p-6 border border-ocean-600/30 mb-6 space-y-4"
    >
      <input
        type="text"
        placeholder="Project Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
        required
      />
      <textarea
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
        required
      />
      <input
        type="url"
        placeholder="Image URL"
        value={data.image_url}
        onChange={(e) => setData({ ...data, image_url: e.target.value })}
        className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
        required
      />
      <input
        type="url"
        placeholder="Project Link"
        value={data.link_url}
        onChange={(e) => setData({ ...data, link_url: e.target.value })}
        className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
        required
      />
      <button type="submit" className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-bold rounded transition">
        Save Project
      </button>
    </form>
  )
}

function HobbyForm({ onSubmit }: { onSubmit: (e: React.FormEvent, data: Partial<Hobby>) => void }) {
  const [data, setData] = useState({ title: '', description: '' })

  return (
    <form
      onSubmit={(e) => {
        onSubmit(e, data)
        setData({ title: '', description: '' })
      }}
      className="bg-ocean-700/50 backdrop-blur rounded-lg p-6 border border-ocean-600/30 mb-6 space-y-4"
    >
      <input
        type="text"
        placeholder="Hobby Title"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
        className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
        required
      />
      <textarea
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
        className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none"
        required
      />
      <button type="submit" className="w-full px-4 py-2 bg-teal-500 hover:bg-teal-400 text-ocean-900 font-bold rounded transition">
        Save Hobby
      </button>
    </form>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { client } from '../lib/sanity'
import { Linkedin } from 'lucide-react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    requestType: 'Consulting',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await client.create({
        _type: 'lead',
        name: formData.name,
        email: formData.email,
        company: formData.company,
        requestType: formData.requestType,
        message: formData.message,
        receivedAt: new Date().toISOString(),
      })

      setSuccess(true)
      setFormData({ name: '', email: '', company: '', requestType: 'Consulting', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Error sending message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-12 text-center">Let's Connect</h2>

          <div className="flex justify-center mb-12">
            <a
              href="https://www.linkedin.com/in/antoniocarcagnì/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center p-6 bg-ocean-700/50 backdrop-blur rounded-lg border border-ocean-600/30 hover:border-teal-400/50 transition-all hover:scale-105"
            >
              <Linkedin className="text-teal-400 mb-3" size={32} />
              <h3 className="text-white font-bold mb-2">LinkedIn</h3>
              <p className="text-gray-300 text-sm">Connect with me</p>
            </a>
          </div>

          {/* Contact Form */}
          <div className="bg-ocean-700/50 backdrop-blur rounded-lg border border-ocean-600/30 p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send Me a Message</h3>

            {success && (
              <div className="mb-6 p-4 bg-teal-400/20 border border-teal-400/50 rounded-lg text-teal-300">
                ✓ Message sent successfully! I'll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none transition"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none transition"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-semibold mb-2">Request Type</label>
                  <select
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white focus:border-teal-400 focus:outline-none transition"
                  >
                    <option value="Consulting">Consulting</option>
                    <option value="Mentoring">Mentoring</option>
                    <option value="Speaking">Speaking</option>
                    <option value="Project">Project Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 bg-ocean-800 border border-ocean-600/50 rounded text-white placeholder-gray-500 focus:border-teal-400 focus:outline-none transition resize-none"
                  placeholder="Tell me about your project or opportunity..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-teal-500 hover:bg-teal-400 disabled:bg-gray-600 text-ocean-900 font-bold rounded-lg transition-all"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

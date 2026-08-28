import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import { LogIn } from 'lucide-react'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || '***REMOVED-EMAIL***'

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/admin')
      }
    })
  }, [navigate])

  const handleGoogleLogin = async () => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/admin`,
        },
      })

      if (error) throw error
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-700 via-ocean-800 to-ocean-900 flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-ocean-700/50 backdrop-blur border border-ocean-600/30 rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">CMS Admin</h1>
            <p className="text-gray-300">Sign in with your Google account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white hover:bg-gray-100 disabled:bg-gray-400 text-ocean-900 font-bold rounded-lg transition-all"
          >
            <LogIn size={20} />
            {loading ? 'Signing in...' : 'Sign in with Google'}
          </button>

          <div className="mt-8 p-4 bg-ocean-800/50 rounded-lg border border-ocean-600/30">
            <p className="text-gray-400 text-sm">
              <span className="text-teal-400 font-semibold">Note:</span> Only authorized admin accounts can access the CMS.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Authorized email: <span className="text-teal-400">{adminEmail}</span>
            </p>
          </div>

          <a
            href="/"
            className="block text-center mt-6 text-gray-300 hover:text-teal-400 transition text-sm"
          >
            ← Back to Portfolio
          </a>
        </div>
      </motion.div>
    </div>
  )
}

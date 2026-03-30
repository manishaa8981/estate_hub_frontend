import { Eye, EyeOff, Home, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFieldErrors({})
    setLoading(true)
    try {
      await login(form.email, form.password)
      setSuccess(true)
      setTimeout(() => navigate('/dashboard', { replace: true }), 1000)
    } catch (err) {
      if (err.fields && Object.keys(err.fields).length > 0) {
        setFieldErrors(err.fields)
      } else {
        setFieldErrors({ general: err.message })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center flex-col justify-between p-12"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,30,50,0.75), rgba(10,30,50,0.85)), url('https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80')` }}
      >
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <Home className="w-6 h-6 text-accent" /> EstateHub
        </Link>
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Welcome back.</h2>
          <p className="text-gray-300 text-lg">Your next home is just a search away.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl mb-10 lg:hidden">
            <Home className="w-6 h-6 text-accent" /> EstateHub
          </Link>

          <h1 className="text-3xl font-bold text-primary mb-2">Sign In</h1>
          <p className="text-gray-500 mb-8">
            Don't have an account? <Link to="/register" className="text-accent font-medium hover:underline">Sign up</Link>
          </p>

          {fieldErrors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {fieldErrors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email" required placeholder="you@example.com"
                  value={form.email}
                  disabled={loading || success}
                  onChange={e => { setForm({ ...form, email: e.target.value }); setFieldErrors(p => ({ ...p, email: '' })) }}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm outline-none focus:ring-2 transition disabled:bg-gray-50 disabled:cursor-not-allowed
                    ${fieldErrors.email ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`}
                />
              </div>
              {fieldErrors.email && <p className="text-red-500 text-xs mt-1">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type={showPass ? 'text' : 'password'} required placeholder="••••••••"
                  value={form.password}
                  disabled={loading || success}
                  onChange={e => { setForm({ ...form, password: e.target.value }); setFieldErrors(p => ({ ...p, password: '' })) }}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl text-sm outline-none focus:ring-2 transition disabled:bg-gray-50 disabled:cursor-not-allowed
                    ${fieldErrors.password ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            <button
              type="submit" disabled={loading || success}
              className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-colors disabled:opacity-70
                ${success ? 'bg-green-500 text-white' : 'bg-primary hover:bg-primary/90 text-white'}`}
            >
              {loading && <Spinner size="sm" color="white" />}
              {success ? '✓ Redirecting...' : loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

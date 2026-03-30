import { Eye, EyeOff, Home, Lock, Mail, User } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import { useAuth } from '../context/AuthContext'

function PasswordStrength({ password }) {
  if (!password) return null
  const checks = [
    { label: '8+ characters', ok: password.length >= 8 },
    { label: 'Uppercase', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /[0-9]/.test(password) },
  ]
  return (
    <div className="flex gap-2 mt-2">
      {checks.map(({ label, ok }) => (
        <span key={label} className={`text-xs px-2 py-0.5 rounded-full ${ok ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'}`}>
          {label}
        </span>
      ))}
    </div>
  )
}

export default function RegisterPage() {
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'buyer' })
  const [fieldErrors, setFieldErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const { register, showToast } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFieldErrors({})
    setLoading(true)
    try {
      await register(form.name, form.email, form.password, form.role)
      showToast('Account created! Welcome to EstateHub.')
      setSuccess(true)
      setTimeout(() => navigate('/dashboard', { replace: true }), 1200)
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

  const field = (key) => ({
    onChange: (e) => {
      setForm({ ...form, [key]: e.target.value })
      if (fieldErrors[key]) setFieldErrors(prev => ({ ...prev, [key]: '' }))
    },
    error: fieldErrors[key],
  })

  return (
    <div className="min-h-screen flex">
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center flex-col justify-between p-12"
        style={{ backgroundImage: `linear-gradient(to bottom, rgba(10,30,50,0.75), rgba(10,30,50,0.85)), url('https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80')` }}
      >
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <Home className="w-6 h-6 text-accent" /> EstateHub
        </Link>
        <div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Start your journey.</h2>
          <p className="text-gray-300 text-lg">Thousands of homes are waiting for you.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl mb-10 lg:hidden">
            <Home className="w-6 h-6 text-accent" /> EstateHub
          </Link>

          <h1 className="text-3xl font-bold text-primary mb-2">Create Account</h1>
          <p className="text-gray-500 mb-8">
            Already have an account? <Link to="/login" className="text-accent font-medium hover:underline">Sign in</Link>
          </p>

          {fieldErrors.general && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-5">
              {fieldErrors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text" required placeholder="John Doe"
                  value={form.name} {...field('name')}
                  disabled={loading || success}
                  className={`w-full pl-10 pr-4 py-3 border rounded-xl text-sm outline-none focus:ring-2 transition disabled:bg-gray-50 disabled:cursor-not-allowed
                    ${fieldErrors.name ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`}
                />
              </div>
              {fieldErrors.name && <p className="text-red-500 text-xs mt-1">{fieldErrors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="email" required placeholder="you@example.com"
                  value={form.email} {...field('email')}
                  disabled={loading || success}
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
                  type={showPass ? 'text' : 'password'} required placeholder="Min. 8 characters"
                  value={form.password} {...field('password')}
                  disabled={loading || success}
                  className={`w-full pl-10 pr-10 py-3 border rounded-xl text-sm outline-none focus:ring-2 transition disabled:bg-gray-50 disabled:cursor-not-allowed
                    ${fieldErrors.password ? 'border-red-400 focus:ring-red-100' : 'border-gray-200 focus:border-accent focus:ring-accent/20'}`}
                />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
              {fieldErrors.password && <p className="text-red-500 text-xs mt-1">{fieldErrors.password}</p>}
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">I am a</label>
              <select
                value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition bg-white"
              >
                <option value="buyer">Buyer / Renter</option>
                <option value="seller">Seller / Agent</option>
              </select>
            </div>

            <button
              type="submit" disabled={loading || success}
              className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-colors disabled:opacity-70
                ${success ? 'bg-green-500 text-white' : 'bg-accent hover:bg-amber-500 text-white'}`}
            >
              {loading && <Spinner size="sm" color="white" />}
              {success ? '✓ Redirecting...' : loading ? 'Creating account...' : 'Create Account'}
            </button>

          </form>
        </div>
      </div>
    </div>
  )
}

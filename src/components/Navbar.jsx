import { Home, Menu, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ConfirmModal from './ConfirmModal'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false)
    logout()
    window.location.href = '/'
  }

  return (
    <>
      {showLogoutModal && (
        <ConfirmModal
          variant="logout"
          title="Sign out?"
          message="You'll need to sign in again to access your dashboard and saved properties."
          confirmLabel="Yes, sign out"
          cancelLabel="Stay signed in"
          onConfirm={handleLogoutConfirm}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      <nav className="fixed top-0 w-full z-40 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
            <Home className="w-6 h-6 text-accent" />
            <span>EstateHub</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#properties" className="hover:text-primary transition-colors">Properties</a>
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="hover:text-primary transition-colors">Testimonials</a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors px-4 py-2">
                  <User className="w-4 h-4" /> {user.name}
                </Link>
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-sm font-semibold border border-gray-200 text-gray-600 px-5 py-2 rounded-lg hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm font-medium text-primary hover:text-accent transition-colors px-4 py-2">
                  Sign In
                </Link>
                <Link to="/register" className="text-sm font-semibold bg-accent text-white px-5 py-2 rounded-lg hover:bg-amber-500 transition-colors">
                  Get Started
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {open && (
          <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 text-sm font-medium text-gray-700">
            <a href="#properties" onClick={() => setOpen(false)}>Properties</a>
            <a href="#features" onClick={() => setOpen(false)}>Features</a>
            <a href="#testimonials" onClick={() => setOpen(false)}>Testimonials</a>
            <hr />
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)}>My Dashboard</Link>
                <button
                  onClick={() => { setOpen(false); setShowLogoutModal(true) }}
                  className="text-left text-red-500 font-medium"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>Sign In</Link>
                <Link to="/register" onClick={() => setOpen(false)} className="bg-accent text-white text-center py-2 rounded-lg">
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

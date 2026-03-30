import { Bath, Bed, Home, LogOut, MapPin, Square, Trash2, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api'
import ConfirmModal from '../components/ConfirmModal'
import Toast from '../components/Toast'
import { useAuth } from '../context/AuthContext'

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [favourites, setFavourites] = useState([])
  const [loading, setLoading] = useState(true)
  const [removing, setRemoving] = useState(null)
  const [toast, setToast] = useState(null)
  const [removeTarget, setRemoveTarget] = useState(null) // { id, title }
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  useEffect(() => {
    api.getFavourites()
      .then(setFavourites)
      .catch(() => setToast({ message: 'Could not load favourites', type: 'error' }))
      .finally(() => setLoading(false))
  }, [])

  const handleRemoveConfirm = async () => {
    const { id, title } = removeTarget
    setRemoveTarget(null)
    setRemoving(id)
    try {
      await api.removeFavourite(id)
      setFavourites(prev => prev.filter(f => f.property_id !== id))
      setToast({ message: `"${title}" removed from favourites`, type: 'success' })
    } catch (err) {
      setToast({ message: err.message || 'Could not remove favourite', type: 'error' })
    } finally {
      setRemoving(null)
    }
  }

  const handleLogoutConfirm = () => {
    setShowLogoutModal(false)
    logout()
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {removeTarget && (
        <ConfirmModal
          variant="danger"
          title="Remove from favourites?"
          message={`"${removeTarget.title}" will be removed from your saved properties.`}
          confirmLabel="Remove"
          cancelLabel="Keep it"
          onConfirm={handleRemoveConfirm}
          onCancel={() => setRemoveTarget(null)}
        />
      )}

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

      {/* Top nav */}
      <nav className="bg-white border-b border-gray-100 shadow-sm px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl">
          <Home className="w-6 h-6 text-accent" /> EstateHub
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500 hidden sm:block">{user?.email}</span>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Profile card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 flex items-center gap-5">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <User className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">Welcome back, {user?.name}</h1>
            <p className="text-gray-500 text-sm mt-0.5">{user?.email}</p>
            <span className="inline-block mt-2 text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full capitalize">
              {user?.role}
            </span>
          </div>
        </div>

        {/* Favourites */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-primary">
              My Favourites
              {!loading && (
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({favourites.length} {favourites.length === 1 ? 'property' : 'properties'})
                </span>
              )}
            </h2>
            <Link to="/" className="text-sm text-accent hover:underline font-medium">Browse more →</Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-3 bg-gray-100 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : favourites.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-20 text-center">
              <p className="text-gray-400 text-lg mb-3">No favourites yet</p>
              <Link to="/" className="text-accent font-medium hover:underline text-sm">
                Browse properties and heart the ones you love
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favourites.map(f => (
                <div key={f.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={f.property_image || 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&q=80'}
                      alt={f.property_title}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full ${f.property_tag === 'For Sale' ? 'bg-primary text-white' : 'bg-accent text-white'}`}>
                      {f.property_tag}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-accent font-bold text-lg">{f.property_price}</p>
                    <h3 className="text-primary font-semibold mt-0.5">{f.property_title}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                      <MapPin className="w-3 h-3" /> {f.property_location}
                    </div>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Bed className="w-3.5 h-3.5" /> {f.property_beds}</span>
                      <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {f.property_baths}</span>
                      <span className="flex items-center gap-1"><Square className="w-3.5 h-3.5" /> {f.property_sqft} sqft</span>
                      <button
                        onClick={() => setRemoveTarget({ id: f.property_id, title: f.property_title })}
                        disabled={removing === f.property_id}
                        className="ml-auto flex items-center gap-1 text-red-400 hover:text-red-600 transition-colors disabled:opacity-40"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        {removing === f.property_id ? 'Removing...' : 'Remove'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

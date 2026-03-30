import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Spinner from './Spinner'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Spinner size="lg" color="primary" />
        <p className="text-gray-400 text-sm mt-4">Loading your dashboard...</p>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />
  return children
}

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { api } from '../api'
import Toast from '../components/Toast'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type })
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.getMe()
        .then(setUser)
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const data = await api.login({ email, password })
    localStorage.setItem('token', data.token)
    setUser(data.user)
    showToast(`Welcome back, ${data.user.name}!`)
    return data.user
  }

  const register = async (name, email, password, role) => {
    const data = await api.register({ name, email, password, role })
    localStorage.setItem('token', data.token)
    setUser(data.user)
    return data.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    showToast('You have been signed out.')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, showToast }}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

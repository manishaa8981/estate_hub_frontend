const BASE = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem('token')
}

async function request(path, options = {}) {
  const token = getToken()
  const res = await fetch(`${BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  })
  const data = await res.json()
  if (!res.ok) {
    // Attach field errors to the thrown error so forms can use them
    const err = new Error(data.errors?.general || 'Request failed')
    err.fields = data.errors || {}
    throw err
  }
  return data
}

export const api = {
  register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
  login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
  getMe: () => request('/auth/me'),
  getFavourites: () => request('/favourites'),
  addFavourite: (body) => request('/favourites', { method: 'POST', body: JSON.stringify(body) }),
  removeFavourite: (propertyId) => request(`/favourites/${propertyId}`, { method: 'DELETE' }),
}

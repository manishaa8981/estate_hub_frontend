// const BASE = "/api";

// function getToken() {
//   return localStorage.getItem("token");
// }

// function authHeaders() {
//   const token = getToken();
//   return {
//     "Content-Type": "application/json",
//     ...(token ? { Authorization: `Bearer ${token}` } : {}),
//   };
// }

// async function request(path, options = {}) {
//   const res = await fetch(`${BASE}${path}`, {
//     headers: authHeaders(),
//     ...options,
//   });
//   const data = await res.json();
//   if (!res.ok) throw new Error(data.error || "Something went wrong.");
//   return data;
// }

// export const api = {
//   // Auth
//   register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
//   login:    (body) => request("/auth/login",    { method: "POST", body: JSON.stringify(body) }),
//   me:       ()     => request("/auth/me"),

//   // Properties
//   getProperties: () => request("/properties"),

//   // Favourites
//   getFavourites:    ()   => request("/favourites"),
//   addFavourite:     (id) => request(`/favourites/${id}`, { method: "POST" }),
//   removeFavourite:  (id) => request(`/favourites/${id}`, { method: "DELETE" }),
// };
const BASE = import.meta.env.VITE_API_URL;

function getToken() {
  return localStorage.getItem("token");
}

function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: authHeaders(),
    ...options,
  });

  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  if (!res.ok) throw new Error(data.error || "Something went wrong.");

  return data;
}

export const api = {
  register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  login:    (body) => request("/auth/login",    { method: "POST", body: JSON.stringify(body) }),
  me:       ()     => request("/auth/me"),

  getProperties: () => request("/properties"),

  getFavourites:   ()   => request("/favourites"),
  addFavourite:    (id) => request(`/favourites/${id}`, { method: "POST" }),
  removeFavourite: (id) => request(`/favourites/${id}`, { method: "DELETE" }),
};
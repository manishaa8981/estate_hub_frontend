// import { createContext, useContext, useState, useEffect } from "react";
// import { api } from "../utils/api";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Rehydrate from localStorage on mount
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) { setLoading(false); return; }

//     api.me()
//       .then(({ user }) => setUser(user))
//       .catch(() => localStorage.removeItem("token"))
//       .finally(() => setLoading(false));
//   }, []);

//   async function login(email, password) {
//     const { token, user } = await api.login({ email, password });
//     localStorage.setItem("token", token);
//     setUser(user);
//   }

//   async function register(name, email, password) {
//     const { token, user } = await api.register({ name, email, password });
//     localStorage.setItem("token", token);
//     setUser(user);
//   }

//   function logout() {
//     localStorage.removeItem("token");
//     setUser(null);
//   }

//   return (
//     <AuthContext.Provider value={{ user, loading, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .me()
      .then(({ user }) => setUser(user))
      .catch(() => localStorage.removeItem("token"))
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    try {
      const { token, user } = await api.login({ email, password });
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      throw err.message;
    }
  }

  async function register(name, email, password) {
    try {
      const { token, user } = await api.register({ name, email, password });
      localStorage.setItem("token", token);
      setUser(user);
      navigate("/dashboard");
    } catch (err) {
      throw err.message;
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

import React, { createContext, useContext, useMemo, useState } from "react";
import { storage, STORAGE_KEYS } from "../utils/localStorage";
import { API } from "../utils/api";

// Centralized auth context using backend /api/auth
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Persist only the currently authenticated user for UI purposes
  const [currentUser, setCurrentUser] = useState(() =>
    storage.get(STORAGE_KEYS.USER, null)
  );

  const persistCurrentUser = (user) => {
    setCurrentUser(user);
    if (user) storage.set(STORAGE_KEYS.USER, user);
    else storage.remove(STORAGE_KEYS.USER);
  };

  // Signup via backend
  const signup = async ({ name, email, password }) => {
    try {
      const { user, token } = await API.register({ name, email, password });
      // Keep a minimal user object in app state/localStorage
      const minimal = { id: user.id, name: user.name, email: user.email };
      persistCurrentUser(minimal);
      // Store JWT for authenticated requests
      API.token = token;
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.message || "Signup failed" };
    }
  };

  // Login via backend
  const login = async (email, password) => {
    try {
      const { user, token } = await API.login({ email, password });
      const minimal = { id: user.id, name: user.name, email: user.email };
      persistCurrentUser(minimal);
      API.token = token;
      return { success: true };
    } catch (e) {
      return { success: false, error: e?.message || "Login failed" };
    }
  };

  const logout = async () => {
    persistCurrentUser(null);
    API.token = null;
  };

  const value = useMemo(
    () => ({ currentUser, login, signup, logout }),
    [currentUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

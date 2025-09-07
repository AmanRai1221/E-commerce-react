import React, { createContext, useContext, useMemo, useState } from "react";
import { storage, STORAGE_KEYS } from "../utils/localStorage";

// Create context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Load from localStorage
  const [users, setUsers] = useState(() => storage.get(STORAGE_KEYS.USERS, []));
  const [currentUser, setCurrentUser] = useState(() =>
    storage.get(STORAGE_KEYS.USER, null)
  );

  const persistUsers = (nextUsers) => {
    setUsers(nextUsers);
    storage.set(STORAGE_KEYS.USERS, nextUsers);
  };

  const persistCurrentUser = (user) => {
    setCurrentUser(user);
    if (user) storage.set(STORAGE_KEYS.USER, user);
    else storage.remove(STORAGE_KEYS.USER);
  };

  const signup = async ({ name, email, password }) => {
    try {
      const { user, token } = await (
        await import("../utils/api")
      )?.API.register({ name, email, password });
      // Persist minimal user locally just like before
      const newUser = { id: user.id, name: user.name, email: user.email };
      persistUsers([...(users || []), { ...newUser }]);
      persistCurrentUser(newUser);
      // Save token for auth routes
      const { API } = await import("../utils/api");
      API.token = token;
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || "Signup failed" };
    }
  };

  const login = async (email, password) => {
    try {
      const { user, token } = await (
        await import("../utils/api")
      )?.API.login({ email, password });
      const minimal = { id: user.id, name: user.name, email: user.email };
      persistCurrentUser(minimal);
      // Save token for auth routes
      const { API } = await import("../utils/api");
      API.token = token;
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message || "Login failed" };
    }
  };

  const logout = async () => {
    persistCurrentUser(null);
    const { API } = await import("../utils/api");
    API.token = null;
  };

  const value = useMemo(
    () => ({ currentUser, login, signup, logout }),
    [currentUser, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};

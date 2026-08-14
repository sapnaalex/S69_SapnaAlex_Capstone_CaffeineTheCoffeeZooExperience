import { useCallback, useEffect, useMemo, useState } from "react";
import { getProfile, login as loginRequest, register as registerRequest } from "../api/authApi";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "../api/client";
import AuthContext from "./authContext";

const readStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);
  const [isLoading, setIsLoading] = useState(true);

  const clearSession = useCallback(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  }, []);

  const saveSession = useCallback((session) => {
    localStorage.setItem(TOKEN_STORAGE_KEY, session.token);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(session.user));
    setUser(session.user);
  }, []);

  useEffect(() => {
    const restoreSession = async () => {
      if (!localStorage.getItem(TOKEN_STORAGE_KEY)) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await getProfile();
        const profile = response.user || response.data;
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
        setUser(profile);
      } catch (error) {
        if (error.response?.status === 401 || error.response?.status === 404) clearSession();
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, [clearSession]);

  useEffect(() => {
    window.addEventListener("caffeine:unauthorized", clearSession);
    return () => window.removeEventListener("caffeine:unauthorized", clearSession);
  }, [clearSession]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user && localStorage.getItem(TOKEN_STORAGE_KEY)),
    isLoading,
    login: async (payload) => {
      const session = await loginRequest(payload);
      saveSession(session);
      return session;
    },
    register: async (payload) => {
      const session = await registerRequest(payload);
      saveSession(session);
      return session;
    },
    logout: clearSession,
  }), [clearSession, isLoading, saveSession, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

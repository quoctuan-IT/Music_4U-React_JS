import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "../utils/authStorage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchProfile = useCallback(async () => {
    const response = await api.get("/auth/profile/");
    setUser(response.data);
    return response.data;
  }, []);

  useEffect(() => {
    const initAuth = async () => {
      if (!getAccessToken()) {
        setLoading(false);
        return;
      }

      try {
        await fetchProfile();
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [fetchProfile]);

  const login = async (username, password) => {
    const response = await api.post("/auth/login/", { username, password });
    setTokens({
      access: response.data.access,
      refresh: response.data.refresh,
    });
    await fetchProfile();
    navigate("/");
  };

  const register = async ({ username, password, password2, email = "" }) => {
    const response = await api.post("/auth/register/", {
      username,
      password,
      password2,
      email,
    });
    setTokens({
      access: response.data.access,
      refresh: response.data.refresh,
    });
    await fetchProfile();
    navigate("/profile");
  };

  const logout = async () => {
    const refresh = getRefreshToken();

    try {
      if (refresh && getAccessToken()) {
        await api.post("/auth/logout/", { refresh });
      }
    } catch {
      // Clear local session.
    } finally {
      clearTokens();
      setUser(null);
      navigate("/login");
    }
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    fetchProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

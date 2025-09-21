// src/context/AuthContext.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext, type User } from "./AuthContext";
import { useToast } from "@/hooks/useToast";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_URL,
  withCredentials: true, // 👈 send cookies automatically
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast();
  const [token, setAccessToken] = useState<string>('');
  const [user, setUser] = useState<User>({
    name: '',
    school_id: 0,
    role: '',
    id: 0,
    email: ''
  });
  const [loading, setLoading] = useState(true);

  // --- Axios interceptor for auto refresh ---
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;
        if (originalRequest.url.includes("/refresh")) {
          return Promise.reject(error);
        }
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const { data } = await api.post("/auth/refresh");
            const newToken = data.token;

            setAccessToken(newToken);
            api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

            return api(originalRequest);
          } catch (err) {
            console.log("Error")
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      api.interceptors.response.eject(interceptor);
    };
  }, []);
  //google sign up 
  const googleSignUp = async ({ idToken, role, school_id, class_section }: any) => {
    const response = await api.post("/auth/google", { idToken, role, school_id, class_section });
    toast({
      message: response.data.message,
      type: response.data.status
    })
    if (response && response.data) {
      const { token } = response.data;
      setAccessToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const profile = await api.get("/auth/profile");
      setUser(profile.data.data);
    }


  };
  //google sign in
  const googleSignIn = async ({ idToken }: any) => {
    const response = await api.post("/auth/google", { idToken });
    toast({
      message: response.data.message,
      type: response.data.status
    })
    if (response && response.data) {
      const { token } = response.data;
      setAccessToken(token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const profile = await api.get("/auth/profile");
      setUser(profile.data.data);
    }


  };
  // --- Login ---
  const login = async ({ email, password }: any) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      toast({
        message: response.data.message,
        type: response.data.status
      })
      const { token } = response.data;

      setAccessToken(token);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const profile = await api.get("/auth/profile");
      setUser(profile.data.data);
    } catch (error: any) {
      // Axios error has a `response` object
      toast({
        message: error.response?.data?.message || "Login failed",
        type: "error",
      });
    }

  };
  const register = async ({ name, email, password, role, schoolName, class_section }: any) => {
    const response = await api.post("/auth/signup", { name, email, password, role, schoolName, class_section });
    toast({
      message: response.data.message,
      type: response.data.status
    })

  };
  // --- Logout ---
  const logout = async () => {
    const response = await api.post("/auth/logout");
    toast({
      message: response.data.message,
      type: response.data.status
    })
    setUser({
      name: '',
      school_id: 0,
      role: '',
      id: 0,
      email: ''
    })
    setAccessToken('')

    console.log("Error while logging out")
  };

  // --- Load user on mount (try refresh) ---
  useEffect(() => {
    const init = async () => {
      try {
        const { data } = await api.post("/auth/refresh"); // 👈 refresh if valid cookie exists
        setAccessToken(data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        const profile = await api.get("/auth/profile");
        setUser(profile.data.data);
      } catch {
        console.log("Error")
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: !!token,
        login,
        logout,
        register,
        googleSignUp,
        googleSignIn
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook

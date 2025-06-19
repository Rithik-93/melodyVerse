
import React, { createContext, useContext, useState, useEffect } from 'react';
import { z } from 'zod';
import { userCreateSchema, userLoginSchema } from '@/types/types';
import axios from 'axios'

type SignupData = z.infer<typeof userCreateSchema>;

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      // Ideally fetch current user
      fetchCurrentUser(savedToken);
    }
    setIsLoading(false);
  }, []);

  const fetchCurrentUser = async (jwt: string) => {
    try {
      const res = await axios.get(
        "/api/v1/me",
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setUser(res.data.user);
    } catch {
      // token invalid
      logout();
    }
  };

  const login = async (
    email: string,
    password: string,
    rememberMe = false
  ) => {
    setIsLoading(true);
    try {
      userLoginSchema.parse({ email, password });
      const res = await axios.post("http://localhost:3000/api/v1/auth/login", { email, password });
      const { accessToken: jwt, user: userData } = res.data;

      setToken(jwt);
      setUser(userData);

      // Persist token
      if (rememberMe) {
        localStorage.setItem("token", jwt);
      } else {
        sessionStorage.setItem("token", jwt);
      }
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        console.error("Validation Error:", err.issues);
        throw new Error("Invalid login input");
      }
      console.error(err);
      throw new Error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    userData: SignupData,
    rememberMe = false
  ) => {
    setIsLoading(true);
    try {
      userCreateSchema.parse(userData);
      const res = await axios.post("http://localhost:3000/api/v1/auth/register", userData);
      const { accessToken: jwt, user: userDataRes } = res.data;
      console.log()
      setToken(jwt);
      setUser(userDataRes);
      if (res.status !== 201) {
        throw new Error(res.data)
      }

      if (rememberMe) {
        localStorage.setItem("token", jwt);
      } else {
        sessionStorage.setItem("token", jwt);
      }
    } catch (err: unknown) {
      if (err instanceof z.ZodError) {
        console.error("Validation Error:", err.issues);
        throw new Error("Invalid signup input");
      }
      console.error(err);
      throw new Error("Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  };

  const value = {
    user,
    token,
    isLoading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

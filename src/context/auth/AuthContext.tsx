// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: ({email, password}:any) => Promise<void>;
  register: ({name, email, password,role}:any) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);



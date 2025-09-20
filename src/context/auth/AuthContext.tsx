// src/context/AuthContext.tsx
import { createContext } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  school_id:number;
}

export interface AuthContextType {
  token: string;
  user: User;
  loading: boolean;
  isAuthenticated: boolean;
  login: ({email, password}:any) => Promise<void>;
  register: ({name, email, password,role}:any) => Promise<void>;
  logout: () => void;
  googleSignUp: ({idToken,role,school_id,classSection}:any) => void;
  googleSignIn: ({idToken}:any) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);



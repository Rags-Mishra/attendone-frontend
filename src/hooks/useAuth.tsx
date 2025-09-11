import { AuthContext, type AuthContextType } from "@/context/auth/AuthContext";
import { useContext } from "react";

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
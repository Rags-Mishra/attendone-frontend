import ClassContext, { type ClassContextType } from "@/context/class/ClassContext";
import { useContext } from "react";

export const useClass = (): ClassContextType => {
  const ctx = useContext(ClassContext);
  if (!ctx) throw new Error("useClass must be used inside ClassProvider");
  return ctx;
};
import type { DashboardContextType } from "@/context/dashboard/DashboardContext";
import DashboardContext from "@/context/dashboard/DashboardContext";
import { useContext } from "react";

export const useDashboard = (): DashboardContextType => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error("useDashboard must be used within DashboardProvider");
  return ctx;
};

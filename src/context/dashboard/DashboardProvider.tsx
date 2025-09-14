import React, { useCallback, useState } from "react";
import DashboardContext from "./DashboardContext";
import type {  DashboardContextType, DashboardData } from "./DashboardContext";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";



export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData|null>(null);
  const [loading, setLoading] = useState(false);
const {token}=useAuth();


const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    console.log("token",token)
    try {
      const res = await api.get("/dashboard", {
      headers: { Authorization: `Bearer ${token}` },
    });
      setDashboardData(res.data);
    } catch (err) {
      console.error("Error fetching classes", err);
    } finally {
      setLoading(false);
    }
  },[token]);


  const value: DashboardContextType = {
    dashboardData,
    loading,
    setDashboardData,
    fetchDashboardData,
  };

  return <DashboardContext.Provider value={value}>{children}</DashboardContext.Provider>;
};

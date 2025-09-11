import { createContext } from "react";

export interface DashboardData {
  total_students: number;
  present_today: number;
  absent_today: number;
  attendancePercentage: number;
}

export interface DashboardContextType {
  dashboardData: DashboardData|null;
  setDashboardData: React.Dispatch<React.SetStateAction<DashboardData|null>>;
  loading: boolean;
  fetchDashboardData: () => Promise<void>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(
  undefined
);

export default DashboardContext;

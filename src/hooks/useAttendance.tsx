import type { AttendanceContextType } from "@/context/attendance/AttendanceContext";
import AttendanceContext from "@/context/attendance/AttendanceContext";
import { useContext } from "react";

export const useAttendance = (): AttendanceContextType => {
  const ctx = useContext(AttendanceContext);
  if (!ctx) throw new Error("useAttendance must be used within AttendanceProvider");
  return ctx;
};

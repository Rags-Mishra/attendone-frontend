import React, { useState } from "react";
import AttendanceContext from "./AttendanceContext";
import type { Class, Student, AttendanceContextType } from "./AttendanceContext";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";



export const AttendanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(false);
const {token}=useAuth();




  const fetchStudents = async (classId: string) => {
    setLoading(true);
    try {
      const res = await api.get(`/students/${classId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
      const attendance :any= []

      res.data.map((data:any)=>{
        attendance.push({
          id:data.id,
          name:data.name,
          status:'Absent'
        })
    })
      setStudents(attendance);
      
    } catch (err) {
      console.error("Error fetching students", err);
    } finally {
      setLoading(false);
    }
  };

  const markAttendance = async (
    classId: string,
    date: string,
    records: Record<string, string>[] // { studentId: true/false }
  ) => {
    try {
      await api.post(`/attendance/mark`, {
        classId,
        date,
        records,
      }, {
      headers: { Authorization: `Bearer ${token}` },
    });
      console.log("Attendance marked successfully!");
    } catch (err) {
      console.error("Error marking attendance", err);
    }
  };

  const value: AttendanceContextType = {
    students,
    loading,
    setStudents,
    fetchStudents,
    markAttendance,
  };

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>;
};

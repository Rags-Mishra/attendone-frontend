import { createContext } from "react";

export interface Class {
  id: string;
  name: string;
  student_count:string;
}

export interface Student {
  id: string;
  name: string;
  status:string;
}

export interface AttendanceContextType {
  classes: Class[];
  students: Student[];
  setStudents:React.Dispatch<React.SetStateAction<Student[]>>
  loading: boolean;
  fetchClasses: () => Promise<void>;
  fetchStudents: (classId: string) => Promise<void>;
  markAttendance: (classId: string, date: string, records: Record<string, string>[]) => Promise<void>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export default AttendanceContext;

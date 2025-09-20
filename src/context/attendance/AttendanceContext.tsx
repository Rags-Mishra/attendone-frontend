import { createContext } from "react";

export interface Class {
  id: string;
  name: string;
  student_count:string;
}
export interface StudentAttendanceData {
  [className: string]: {
    students: {
      id: number;
      name: string;
      status: "Present" | "Absent" | "Late" ; // can extend if more statuses exist
    }[];
    grade:string,
    section:string,
    date: string; // optional if you want to include attendance date
    totalStudents: number; // optional if you want a count
  };
}

export interface Student {
  id: string;
  name: string;
  status:string;
}

export interface AttendanceContextType {
  students: Student[];
  setStudents:React.Dispatch<React.SetStateAction<Student[]>>
  loading: boolean;
  attendanceData: StudentAttendanceData|null;
  fetchStudents: (classId: string) => Promise<void>;
  fetchAttendance: (school_id: number, date:string) => Promise<void>;
  markAttendance: (classId: string, date: string, records: Record<string, string>[]) => Promise<void>;
}

const AttendanceContext = createContext<AttendanceContextType | undefined>(undefined);

export default AttendanceContext;

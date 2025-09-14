import { createContext } from "react";

export interface Class {
  id: number;
  name: string;
  student_count:number;
school_id:number
}

export interface ClassContextType {
  classes: Class[];
  fetchClasses: (school_id:number) => Promise<void>;
  loading: boolean;
  createClass: (data: Partial<Class>) => Promise<void>;
  modifyClass: (id: number,data: Partial<Class>) => Promise<void>;
  deleteClass: (id: number) => Promise<void>;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export default ClassContext;

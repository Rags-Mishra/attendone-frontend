import { createContext } from "react";


export interface School {
  id: string;
  name: string;
}

export interface SchoolContextType {
  schools: School[];
  loading: boolean;
  fetchSchools: () => Promise<void>;
}

const SchoolContext = createContext<SchoolContextType | undefined>(undefined);

export default SchoolContext;

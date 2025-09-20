import type { SchoolContextType } from "@/context/school/SchoolContext";
import SchoolContext from "@/context/school/SchoolContext";
import { useContext } from "react";

export const useSchool = (): SchoolContextType => {
  const ctx = useContext(SchoolContext);
  if (!ctx) throw new Error("useSchool must be used within SchoolProvider");
  return ctx;
};

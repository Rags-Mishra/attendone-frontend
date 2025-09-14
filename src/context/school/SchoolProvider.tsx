import React, { useState } from "react";
import SchoolContext from "./SchoolContext";
import type { School, SchoolContextType } from "./SchoolContext";
import api from "@/lib/axios";

export const SchoolProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/schools`);

      setSchools(res.data.data);
    } catch (err) {
      console.error("Error fetching schools", err);
    } finally {
      setLoading(false);
    }
  };

  const value: SchoolContextType = {
    schools,
    loading,
    fetchSchools,
  };

  return (
    <SchoolContext.Provider value={value}>{children}</SchoolContext.Provider>
  );
};

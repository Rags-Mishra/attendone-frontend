import React, { useState } from "react";
import ClassContext from "./ClassContext";
import type { Class, ClassContextType } from "./ClassContext";
import api from "@/lib/axios";
import { useAuth } from "@/hooks/useAuth";

export const ClassProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  
const fetchClasses = async (school_id:number) => {
    setLoading(true);
    try {
      const res = await api.get(`/classes/${school_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
      setClasses(res.data);
    } catch (err) {
      console.error("Error fetching classes", err);
    } finally {
      setLoading(false);
    }
  };
  const createClass = async (data: Partial<Class>) => {
    setLoading(true);
    try {
      await api.post("/classes",data, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.error("Error creating class", err);
    } finally {
      setLoading(false);
    }
  };

  const modifyClass = async (id: number, data: Partial<Class>) => {
    setLoading(true);
    try {
      console.log("token in here",token)
      await api.put(`/classes/${id}`, data,{
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error modifying class", err);
    } finally {
      setLoading(false);
    }
  };
  const deleteClass = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/classes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      console.error("Error deleting class", err);
    } finally {
      setLoading(false);
    }
  };

  const value: ClassContextType = {
    classes,
    loading,
    createClass,
    modifyClass,
    deleteClass,
    fetchClasses,
  };

  return (
    <ClassContext.Provider value={value}>{children}</ClassContext.Provider>
  );
};

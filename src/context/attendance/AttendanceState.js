import React, { useReducer } from "react";
import axios from "axios";
import AttendanceContext from "./attendanceContext";
import attendanceReducer from "./attendanceReducer";
import { MARK_ATTENDANCE, GET_ATTENDANCES,ATTENDANCE_ERROR } from "../types";
let url = "http://localhost:4000";

const AttendanceState = (props) => {
  const initialState = {
    attendances: null,
    loading: true,
    error:null
  };
  const [state, dispatch] = useReducer(attendanceReducer, initialState);
  const getAttendances = async () => {
    try {
      const res = await axios.get(`${url}/api/attendance/`);
      dispatch({
        type: GET_ATTENDANCES,
        payload: res.data,
      });
    } catch (err) {
      return err;
    }
  };
  const markAttendance = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post(`${url}/api/attendance`, formData, config);
      dispatch({
        type: MARK_ATTENDANCE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: ATTENDANCE_ERROR,
        payload: error.message,
      });
    }
  };
  return (
    <AttendanceContext.Provider
      value={{
        attendances: state.attendances,
        loading: state.loading,
        error:state.error,
        markAttendance,
        getAttendances,
      }}
    >
      {props.children}
    </AttendanceContext.Provider>
  );
};
export default AttendanceState;

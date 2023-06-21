import React, { useState, useContext, useReducer } from "react";
import axios from "axios";
import StudentContext from "./studentContext";
import studentReducer from "./studentReducer";
import AuthContext from "../auth/authContext";
import { GET_STUDENTS } from "../types";
let url = process.env.REACT_APP_URL;

const StudentState = (props) => {
  const initialState = {
    students: null,
    loading: true,
  };
  const [state, dispatch] = useReducer(studentReducer, initialState);
  const getStudents = async (value) => {
    try {
      const res = await axios.get(`${url}/api/student/${value}`);

      dispatch({
        type: GET_STUDENTS,
        payload: res.data,
      });
    } catch (err) {
      return err;
    }
  };
  return (
    <StudentContext.Provider
      value={{
        students: state.students,
        loading: state.loading,
        getStudents,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
};
export default StudentState;

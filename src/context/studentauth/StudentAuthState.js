import { useReducer, useState } from "react";
import axios from "axios";
import studentauthContext from "./studentauthContext";
import studentauthReducer from "./studentauthReducer";
import setAuthToken from "../../utils/setAuthToken";
import {
  STUDENTREGISTER_SUCCESS,
  STUDENTREGISTER_FAIL,
  STUDENT_LOADED,
  STUDENTAUTH_ERROR,
  STUDENTLOGIN_SUCCESS,
  STUDENTLOGIN_FAIL,
  STUDENTLOGOUT,
  CLEAR_ERRORS,
} from "../types";

let url = process.env.REACT_APP_URL;
const StudentAuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    studentloading: true,
    student: null,
    error: null,
  };

  const [state, dispatch] = useReducer(studentauthReducer, initialState);

  // Load Student
  const loadStudent = async (token) => {
    setAuthToken(token);

    try {
      const res = await axios.get(`${url}/api/studentauth`);
      dispatch({
        type: STUDENT_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({ type: STUDENTAUTH_ERROR });
    }
  };

  // Register Student
  const studentregister = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`${url}/api/users`, formData, config);

      dispatch({
        type: STUDENTREGISTER_SUCCESS,
        payload: res.data,
      });

      loadStudent(res.data?.token);
    } catch (err) {
      alert("Student Exists");
      dispatch({
        type: STUDENTREGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login Student
  const studentlogin = async (formData) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post(`${url}/api/studentauth`, formData, config);

      dispatch({
        type: STUDENTLOGIN_SUCCESS,
        payload: res.data,
      });

      loadStudent(res.data?.token);
    } catch (err) {
      alert("Invalid Credentials");
      dispatch({
        type: STUDENTLOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Logout
  const studentlogout = () => dispatch({ type: STUDENTLOGOUT });

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

  return (
    <studentauthContext.Provider
      value={{
        token: state.token,
        isAuthenticatedStudent: state.isAuthenticatedStudent,
        studentloading: state.studentloading,
       student: state.student,
        error: state.error,
        studentregister,
        loadStudent,
        studentlogin,
        studentlogout,
        clearErrors,
      }}
    >
      {props.children}
    </studentauthContext.Provider>
  );
};

export default StudentAuthState;

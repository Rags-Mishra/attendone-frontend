import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import AttendanceSheet from "./screens/AttendanceSheet";
import TeacherScreen from "./screens/TeacherScreen";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import StudentScreen from "./screens/StudentScreen";
import StudentAttendanceSheet from "./screens/StudentAttendanceSheet";
import Login from "./components/Login";
import Home from "./screens/Home";
import AuthState from "./context/auth/AuthState";
import StudentAuthState from "./context/studentauth/StudentAuthState";
import StudentState from "./context/students/StudentState";
import AttendanceState from "./context/attendance/AttendanceState";
function App() {
  const [loggedIn, setloggedIn] = useState(false);
  return (
    <AuthState>
      <StudentAuthState>
        <StudentState>
          <AttendanceState>
            <Router>
              <Navbar />
              {/* {loggedIn ? ( */}
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route
                  exact
                  path="/teacherscreen"
                  element={<TeacherScreen />}
                />
                <Route
                  exact
                  path="/attendancesheet"
                  element={<AttendanceSheet />}
                />
                <Route
                  exact
                  path="/studentscreen"
                  element={<StudentScreen />}
                />
                <Route
                  exact
                  path="/studentattendancesheet"
                  element={<StudentAttendanceSheet />}
                />
                <Route exact path="/login" element={<Login />} />
                
              </Routes>
              {/* ) : (
             <Login setloggedIn={setloggedIn} />
           )} */}
            </Router>
          </AttendanceState>
        </StudentState>
      </StudentAuthState>
    </AuthState>
  );
}

export default App;

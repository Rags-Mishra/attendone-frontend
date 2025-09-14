// import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import {Navbar} from "./components/Navbar";
// import AttendanceSheet from "./screens/AttendanceSheet";
// import TeacherScreen from "./screens/TeacherScreen";
// import StudentScreen from "./screens/StudentScreen";
// import StudentAttendanceSheet from "./screens/StudentAttendanceSheet";
import Login from "./components/Login";
import Home from "./screens/Home";

// Context Providers
import  { AuthProvider }  from "./context/auth/AuthProvider"; 
import Signup from "./components/SignUp";
import ClassPage from "./components/ClassPage";
import AttendancePage from "./components/AttendancePage";
import { AttendanceProvider } from "./context/attendance/AttendanceProvider";
import { DashboardProvider } from "./context/dashboard/DashboardProvider";
import { ToastProvider } from "./context/toast/ToastProvider";
import { ClassProvider } from "./context/class/ClassProvider";
import { SchoolProvider } from "./context/school/SchoolProvider";
// import StudentState from "./context/students/StudentState";
// import AttendanceState from "./context/attendance/AttendanceState";

function App() {
  return (

    <AuthProvider>
      <SchoolProvider>
      <ToastProvider>
        <ClassProvider>
        <AttendanceProvider>
          <DashboardProvider>
            
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/teacherscreen" element={<TeacherScreen />} />
              <Route path="/attendancesheet" element={<AttendanceSheet />} />
              <Route path="/studentscreen" element={<StudentScreen />} />
              <Route
                path="/studentattendancesheet"
                element={<StudentAttendanceSheet />}
              /> */}
              <Route path="/class" element={<ClassPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mark-attendance" element={<AttendancePage />} />
              <Route path="/sign-up" element={<Signup />} />
            </Routes>
          </Router>
          </DashboardProvider>
        </AttendanceProvider>
        </ClassProvider>
        </ToastProvider>
        </SchoolProvider>
    </AuthProvider>
  );
}

export default App;

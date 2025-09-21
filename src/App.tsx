// import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

import {Navbar} from "./components/Navbar";
// import AttendanceSheet from "./screens/AttendanceSheet";
// import TeacherScreen from "./screens/TeacherScreen";
// import StudentScreen from "./screens/StudentScreen";
// import StudentAttendanceSheet from "./screens/StudentAttendanceSheet";
import Login from "./pages/Login";
import Home from "./pages/Home";

// Context Providers
import  { AuthProvider }  from "./context/auth/AuthProvider"; 
import Signup from "./pages/SignUp";
import ClassPage from "./pages/ClassPage";
import AttendancePage from "./pages/AttendancePage";
import { AttendanceProvider } from "./context/attendance/AttendanceProvider";
import { DashboardProvider } from "./context/dashboard/DashboardProvider";
import { ToastProvider } from "./context/toast/ToastProvider";
import { ClassProvider } from "./context/class/ClassProvider";
import { SchoolProvider } from "./context/school/SchoolProvider";
import { AttendancePanel } from "./pages/AttendancePanel";
import DashboardPage from "./pages/Dashboard";
// import StudentState from "./context/students/StudentState";
// import AttendanceState from "./context/attendance/AttendanceState";

function App() {
  return (
      <ToastProvider>

    <AuthProvider>
      <SchoolProvider>
        <ClassProvider>
        <AttendanceProvider>
          <DashboardProvider>
            
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              {/* <Route path="/teacherscreen" element={<TeacherScreen />} />
              <Route path="/attendancesheet" element={<AttendanceSheet />} />
              <Route path="/studentscreen" element={<StudentScreen />} />
              <Route
                path="/studentattendancesheet"
                element={<StudentAttendanceSheet />}
              /> */}
              <Route path="/view-attendance" element={<AttendancePanel />} />
              <Route path="/class" element={<ClassPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/mark-attendance" element={<AttendancePage />} />
              <Route path="/sign-up" element={<Signup />} />
            </Routes>
          </Router>
          </DashboardProvider>
        </AttendanceProvider>
        </ClassProvider>
        </SchoolProvider>
    </AuthProvider>
        </ToastProvider>

  );
}

export default App;

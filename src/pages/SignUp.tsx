"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Book, Lock, Mail, School, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { useSchool } from "@/hooks/useSchool";
import { useClass } from "@/hooks/useClass";
import type { Class } from "@/context/class/ClassContext";
import GoogleLogin from "@/components/GoogleButton";
interface UserDetails {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  schoolName?: string;
  classSection?: string;
}
const Signup = () => {
  const [userType, setUserType] = useState("teacher");
  const [user, setUser] = useState<UserDetails>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    schoolName: "",
    classSection: "",
  });

  const { register } = useAuth();
  const { fetchClasses,classes } = useClass();
  const { schools, fetchSchools } = useSchool();
  const navigate = useNavigate();
  const { name, email, password, confirmPassword, schoolName, classSection } =
    user;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      name === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    if (userType === "admin") {
      register({
        name: name,
        email: email,
        password: password,
        role: userType,
        schoolName: schoolName,
      });
    } else if (userType === "teacher") {
      register({
        name: name,
        email: email,
        password: password,
        role: userType,
        schoolName: schoolName,
      });
    } else {
      register({
        name: name,
        email: email,
        password: password,
        role: userType,
        schoolName: schoolName,
        class_section: classSection,
      });
    }
    navigate("/login");
    console.log("Signup attempt:", { name, email, userType });
    alert(`Account created successfully as ${userType}!`);
  };
  useEffect(() => {
    fetchSchools();
  }, []);
  return (
    <div className="min-h-screen bg-background flex p-8 justify-center items-center">
      {/* Signup Form */}
      <div className="lg:w-1/2 xs:w-full flex border-2 rounded-lg items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-8 tracking-wider">
              SIGN UP
            </h1>
          </div>

          {/* Signup Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCheck className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                placeholder="Full Name"
                className="w-full pl-10 py-4 bg-transparent border-0 border-b-2 border-border text-foreground placeholder-muted-foreground rounded-none focus:border-primary focus:ring-0 text-lg"
                required
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Email address"
                className="w-full pl-10 py-4 bg-transparent border-0 border-b-2 border-border text-foreground placeholder-muted-foreground rounded-none focus:border-primary focus:ring-0 text-lg"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full pl-10 py-4 bg-transparent border-0 border-b-2 border-border text-foreground placeholder-muted-foreground rounded-none focus:border-primary focus:ring-0 text-lg"
                required
                minLength={6}
              />
            </div>

            {/* Confirm Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-muted-foreground" />
              </div>
              <Input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={onChange}
                placeholder="Confirm Password"
                className="w-full pl-10 py-4 bg-transparent border-0 border-b-2 border-border text-foreground placeholder-muted-foreground rounded-none focus:border-primary focus:ring-0 text-lg"
                required
                minLength={6}
              />
            </div>
            {userType === "admin" && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <School className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="text"
                  name="schoolName"
                  value={schoolName}
                  onChange={onChange}
                  placeholder="School Name"
                  className="w-full pl-10 py-4 bg-transparent border-0 border-b-2 border-border text-foreground placeholder-muted-foreground rounded-none focus:border-primary focus:ring-0 text-lg"
                  required
                />
              </div>
            )}
            {(userType === "student" || userType === "teacher") && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <School className="h-5 w-5 text-muted-foreground" />
                </div>{" "}
                <Select
                  onValueChange={(value: string) =>(
                    setUser({ ...user, schoolName: value }),
    fetchClasses(Number(value))

                  )}
                  value={user.schoolName}
                >
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Select your school">
                      {(() => {
                        const name = schools.find(
                          (s: any) => s.id == user.schoolName
                        )?.name;
                        if (!name) return null;
                        return name.length > 25
                          ? name.slice(0, 25).concat("...")
                          : name;
                      })()}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {schools &&
                      schools.map((school: any) => (
                        <SelectItem key={school.id} value={school.id}>
                          {school.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {userType === "student" && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Book className="h-5 w-5 text-muted-foreground" />
                </div>{" "}
                <Select
                  onValueChange={(value: string) =>
                    setUser({ ...user, classSection: value })
                  }
                  value={classSection}
                >
                  <SelectTrigger className="w-full pl-10">
                    <SelectValue placeholder="Select your class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes&&classes.length>0?classes.map((classItem:Class)=>
                    <SelectItem value={classItem.id.toString()}>{classItem.name}
                      </SelectItem>):<SelectItem value="no class found">
                        No class found</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* User Type Toggle */}
            <div className="flex gap-2 mt-6">
              <Button
                type="button"
                onClick={() => setUserType("admin")}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  userType === "admin"
                    ? "bg-primary text-primary-foreground border border-border"
                    : "bg-transparent text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                Admin
              </Button>
              <Button
                type="button"
                onClick={() => setUserType("teacher")}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  userType === "teacher"
                    ? "bg-primary text-primary-foreground border border-border"
                    : "bg-transparent text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                Teacher
              </Button>
              <Button
                type="button"
                onClick={() => setUserType("student")}
                className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                  userType === "student"
                    ? "bg-primary text-primary-foreground border border-border"
                    : "bg-transparent text-muted-foreground border border-border hover:bg-muted"
                }`}
              >
                Student
              </Button>
            </div>

            {/* Signup Button */}
            <Button
              type="submit"
              className="w-full py-4 bg-primary hover:opacity-90 text-primary-foreground font-semibold text-lg rounded-md transition-colors mt-8"
            >
              SIGN UP
            </Button>

            {/* Divider */}
            <div className="text-center text-muted-foreground text-sm">or</div>

            {/* Google Signup */}
           <GoogleLogin/>

            {/* Login Link */}
            <div className="text-center text-muted-foreground text-sm mt-8">
              {"Already have an account? "}
              <Link to="/login" className="text-foreground hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

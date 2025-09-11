"use client"

import type React from "react"
import {  useState } from "react"
import { Lock, Mail, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"

const Signup = () => {
  const [userType, setUserType] = useState("teacher")
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  
const {register} = useAuth();
const navigate = useNavigate();
  const { name, email, password, confirmPassword } = user

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => setUser({ ...user, [e.target.name]: e.target.value })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name === "" || email === "" || password === "" || confirmPassword === "") {
      alert("Please fill in all fields")
      return
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters long")
      return
    }
    register({
        name:name,
        email:email,
        password:password,
        role:userType
    })
    navigate('/login')
    console.log("Signup attempt:", { name, email, userType })
    alert(`Account created successfully as ${userType}!`)
  }

  return (
    <div className="min-h-screen bg-background flex p-8 justify-center items-center">
      {/* Signup Form */}
      <div className="lg:w-1/2 xs:w-full flex border-2 rounded-lg items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-8 tracking-wider">SIGN UP</h1>
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

            {/* User Type Toggle */}
            <div className="flex gap-2 mt-6">
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
            <Button
              type="button"
              className="w-full py-3 bg-transparent border border-border text-foreground hover:bg-muted rounded-md transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign up with Google
            </Button>

            {/* Login Link */}
            <div className="text-center text-muted-foreground text-sm mt-8">
              {"Already have an account? "}
              <Link to="/login" className="text-foreground hover:underline">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup

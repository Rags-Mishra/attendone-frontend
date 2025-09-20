"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Book, School } from "lucide-react"
import { signInWithPopup } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebaseConfig"
import { useAuth } from "@/hooks/useAuth"
import { useSchool } from "@/hooks/useSchool"
import { useClass } from "@/hooks/useClass"
import { useNavigate } from "react-router-dom"



const GoogleLogin = () => {
  const navigate = useNavigate()
  console.log(window.location.pathname.includes("login"))
  const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { schools, fetchSchools } = useSchool()
    const { classes, fetchClasses } = useClass()
  const {googleSignUp,googleSignIn}=useAuth()
  const [selectedRole, setSelectedRole] = useState("")
  const [selectedSchool, setSelectedSchool] = useState("")
  const [selectedClass, setSelectedClass] = useState("")
  const [schoolName, setSchoolName] = useState("")
  const [googleUserData, setGoogleUserData] = useState<any>(null)
  // Mock Google authentication - replace with actual Google OAuth
  const handleGoogleClick = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    setGoogleUserData(result.user); // store only the Firebase user
    setIsDialogOpen(true);
  } catch (error) {
    console.error("Google authentication failed:", error);
    alert("Google authentication failed. Please try again.");
  }
};
const handleGoogleLogin=async()=>{
    const result = await signInWithPopup(auth, googleProvider);
  const idToken = await result.user.getIdToken();
  googleSignIn({idToken})

}
 const handleGoogleSignup = async (
  googleUserData: any,
  selectedRole: string,
  selectedSchool: string,
  selectedClass?: string,
) => {
  const idToken = await googleUserData.getIdToken();

  if (selectedRole === "admin" || selectedRole === "teacher") {
    googleSignUp({ idToken, role: selectedRole, school_id: selectedSchool });
  } else if (selectedRole === "student") {
    googleSignUp({ idToken, role: selectedRole, school_id: selectedSchool, class_section: selectedClass });
  }
navigate('/')
  alert(`Account created successfully as ${selectedRole} via Google!`);
};

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    // Reset school and class selections when role changes
    setSelectedSchool("")
    setSelectedClass("")
    setSchoolName("")
  }

  const handleSchoolChange = (schoolId: string) => {
    setSelectedSchool(schoolId)
    setSelectedClass("")
    if (selectedRole === "student" || selectedRole === "teacher") {
      fetchClasses(Number(schoolId))
    }
  }

  const handleSubmit = () => {
    if (!selectedRole) {
      alert("Please select a role")
      return
    }

    if (selectedRole === "admin") {
      if (!schoolName.trim()) {
        alert("Please enter your school name")
        return
      }
      handleGoogleSignup(googleUserData, selectedRole, schoolName)
    } else {
      if (!selectedSchool) {
        alert("Please select a school")
        return
      }
      if (selectedRole === "student" && !selectedClass) {
        alert("Please select a class")
        return
      }
      handleGoogleSignup(googleUserData, selectedRole, selectedSchool, selectedClass)
    }

    // Reset dialog state
    setIsDialogOpen(false)
    setSelectedRole("")
    setSelectedSchool("")
    setSelectedClass("")
    setSchoolName("")
    setGoogleUserData(null)
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
    setSelectedRole("")
    setSelectedSchool("")
    setSelectedClass("")
    setSchoolName("")
    setGoogleUserData(null)
  }
useEffect(()=>{
  if(schools.length==0) fetchSchools()
},[])
  return (
    <>
      <Button
        type="button"
        onClick={window.location.pathname.includes("login")?handleGoogleLogin:handleGoogleClick}
        className="w-full py-4 bg-white hover:bg-gray-50 text-gray-900 font-semibold text-lg rounded-md transition-colors border border-gray-300 flex items-center justify-center gap-3"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Complete Your Registration</DialogTitle>
            <DialogDescription>Please select your role and school to complete your Google signup.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Select your role</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => handleRoleChange("admin")}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    selectedRole === "admin"
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground border border-border hover:bg-muted"
                  }`}
                >
                  Admin
                </Button>
                <Button
                  type="button"
                  onClick={() => handleRoleChange("teacher")}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    selectedRole === "teacher"
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground border border-border hover:bg-muted"
                  }`}
                >
                  Teacher
                </Button>
                <Button
                  type="button"
                  onClick={() => handleRoleChange("student")}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    selectedRole === "student"
                      ? "bg-primary text-primary-foreground"
                      : "bg-transparent text-muted-foreground border border-border hover:bg-muted"
                  }`}
                >
                  Student
                </Button>
              </div>
            </div>

            {/* School Selection */}
            {selectedRole === "admin" && (
              <div className="relative">
                <label className="text-sm font-medium text-foreground mb-2 block">School Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <School className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input
                    type="text"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Enter your school name"
                    className="pl-10"
                  />
                </div>
              </div>
            )}

            {(selectedRole === "student" || selectedRole === "teacher") && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Select your school</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <School className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Select onValueChange={handleSchoolChange} value={selectedSchool}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select your school">
                        {(() => {
                          const school = schools?.find((s: any) => s.id == selectedSchool)
                          if (!school) return null
                          return school.name.length > 25 ? school.name.slice(0, 25).concat("...") : school.name
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
              </div>
            )}

            {/* Class Selection for Students */}
            {selectedRole === "student" && selectedSchool && (
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Select your class</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Book className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Select onValueChange={setSelectedClass} value={selectedClass}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select your class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes && classes.length > 0 ? (
                        classes.map((classItem: any) => (
                          <SelectItem key={classItem.id} value={classItem.id.toString()}>
                            {classItem.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no class found">No class found</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Complete Registration</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default GoogleLogin

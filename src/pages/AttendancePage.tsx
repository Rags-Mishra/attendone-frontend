"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Users, CalendarIcon, Save, CheckCircle2, XCircle, AlertCircle } from "lucide-react"
import { useAttendance } from "@/hooks/useAttendance"  // 👈 using your custom hook
import { useAuth } from "@/hooks/useAuth"
import type { Student } from "@/context/attendance/AttendanceContext"
import { useClass } from "@/hooks/useClass"

type AttendanceStatus = "Present" | "Absent" | "Late"

export default function AttendancePage() {
  const {  students,  fetchStudents, markAttendance,setStudents } = useAttendance()
  const {classes,fetchClasses}=  useClass()
  const [selectedClass, setSelectedClass] = useState<string>("")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [isSaving, setIsSaving] = useState(false)
  const {token,user}=useAuth()
  // Load classes once
  useEffect(() => {
    if(token)fetchClasses(user.school_id)
  }, [token])

  // Load students whenever class changes
  useEffect(() => {
    if (selectedClass) {
      fetchStudents(selectedClass)
    }
  }, [selectedClass])

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    // update locally
setStudents((prev: Student[]) =>
  prev.map((student) =>
    student.id === studentId
      ? { ...student, status } // update this student's status
      : student                // keep others unchanged
  )
);

  }

  const handleSaveAttendance = async () => {
    if (!selectedClass) return
    setIsSaving(true)

    const records=students.map((s) => ({
  studentId: s.id,
  status: s.status   // keep status as "Present"/"Absent"/"Late"
}))
console.log({
  classId:selectedClass,
  date:format(selectedDate, "yyyy-MM-dd"),
  records:records
})
    await markAttendance(selectedClass, format(selectedDate, "yyyy-MM-dd"), records)
    setIsSaving(false)
    console.log("Attendance saved successfully")
  }

  const getStatusIcon = (status: AttendanceStatus) => {
    switch (status) {
      case "Present":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "Absent":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "Late":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: AttendanceStatus) => {
    switch (status) {
      case "Present":
        return "bg-green-100 text-green-800 border-green-200"
      case "Absent":
        return "bg-red-100 text-red-800 border-red-200"
      case "Late":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }


  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Mark Attendance</h1>
            <p className="text-lg text-muted-foreground">Select a class and date to mark student attendance</p>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Class Selection */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Select Class
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Choose a class to mark attendance" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes&&classes?.map((cls) => (
                      <SelectItem key={cls.id} value={cls.id.toString()}>
                        <div className="flex items-center justify-between w-full">
                          <span>{cls.name}</span>
                          <Badge variant="secondary" className="ml-2">
                            {cls.student_count} students
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Date Selection */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  Select Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>
          </div>

          {/* Attendance Stats */}
          {selectedClass && students.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {/* ... same as before for stats */}
            </div>
          )}

          {/* Student List */}
          {selectedClass && students.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-card-foreground">
                  Student Attendance - {classes.find((c) => c.id.toString() === selectedClass)?.name}
                </CardTitle>
                <Button
                  onClick={handleSaveAttendance}
                  disabled={isSaving}
                  className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Attendance"}
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                          <span className="font-semibold text-secondary">
                            {student.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-card-foreground">{student.name}</p>
                          {/* <p className="text-sm text-muted-foreground">Roll No: {student.rollNumber}</p> */}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "px-3 py-1 rounded-full border text-sm font-medium flex items-center gap-2",
                            getStatusColor(student.status as AttendanceStatus),
                          )}
                        >
                          {getStatusIcon(student.status as AttendanceStatus)}
                          {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant={student.status === "Present" ? "default" : "outline"}
                            onClick={() => handleStatusChange(student.id, "Present")}
                          >
                            Present
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === "Absent" ? "default" : "outline"}
                            onClick={() => handleStatusChange(student.id, "Absent")}
                          >
                            Absent
                          </Button>
                          <Button
                            size="sm"
                            variant={student.status === "Late" ? "default" : "outline"}
                            onClick={() => handleStatusChange(student.id, "Late")}
                          >
                            Late
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

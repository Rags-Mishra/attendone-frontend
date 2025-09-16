"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react"

const mockAttendanceData = {
  "Grade 12 - Science A": {
    students: Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      name: `Student ${String(i + 1).padStart(2, "0")}`,
      status: Math.random() > 0.15 ? (Math.random() > 0.1 ? "present" : "late") : ("absent" as AttendanceStatus),
      rollNumber: String(i + 1).padStart(3, "0"),
    })),
    date: "2024-01-15",
    totalStudents: 35,
    grade: "12",
    section: "A",
    subject: "Science",
  },
  "Grade 12 - Science B": {
    students: Array.from({ length: 32 }, (_, i) => ({
      id: i + 36,
      name: `Student ${String(i + 36).padStart(2, "0")}`,
      status: Math.random() > 0.12 ? (Math.random() > 0.08 ? "present" : "late") : ("absent" as AttendanceStatus),
      rollNumber: String(i + 1).padStart(3, "0"),
    })),
    date: "2024-01-15",
    totalStudents: 32,
    grade: "12",
    section: "B",
    subject: "Science",
  },
  "Grade 11 - Commerce A": {
    students: Array.from({ length: 38 }, (_, i) => ({
      id: i + 68,
      name: `Student ${String(i + 68).padStart(2, "0")}`,
      status: Math.random() > 0.18 ? (Math.random() > 0.12 ? "present" : "late") : ("absent" as AttendanceStatus),
      rollNumber: String(i + 1).padStart(3, "0"),
    })),
    date: "2024-01-15",
    totalStudents: 38,
    grade: "11",
    section: "A",
    subject: "Commerce",
  },
  "Grade 11 - Commerce B": {
    students: Array.from({ length: 36 }, (_, i) => ({
      id: i + 106,
      name: `Student ${String(i + 106).padStart(2, "0")}`,
      status: Math.random() > 0.16 ? (Math.random() > 0.09 ? "present" : "late") : ("absent" as AttendanceStatus),
      rollNumber: String(i + 1).padStart(3, "0"),
    })),
    date: "2024-01-15",
    totalStudents: 36,
    grade: "11",
    section: "B",
    subject: "Commerce",
  },
  "Grade 10 - A": {
    students: Array.from({ length: 40 }, (_, i) => ({
      id: i + 142,
      name: `Student ${String(i + 142).padStart(2, "0")}`,
      status: Math.random() > 0.14 ? (Math.random() > 0.11 ? "present" : "late") : ("absent" as AttendanceStatus),
      rollNumber: String(i + 1).padStart(3, "0"),
    })),
    date: "2024-01-15",
    totalStudents: 40,
    grade: "10",
    section: "A",
    subject: "General",
  },
  "Grade 10 - B": {
    students: Array.from({ length: 39 }, (_, i) => ({
      id: i + 182,
      name: `Student ${String(i + 182).padStart(2, "0")}`,
      status: Math.random() > 0.13 ? (Math.random() > 0.1 ? "present" : "late") : ("absent" as AttendanceStatus),
      rollNumber: String(i + 1).padStart(3, "0"),
    })),
    date: "2024-01-15",
    totalStudents: 39,
    grade: "10",
    section: "B",
    subject: "General",
  },
  "Grade 9 - A": {
    students: Array.from({ length: 42 }, (_, i) => ({
      id: i + 221,
      name: `Student ${String(i + 221).padStart(2, "0")}`,
      status: Math.random() > 0.17 ? (Math.random() > 0.13 ? "present" : "late") : ("absent" as AttendanceStatus),
      rollNumber: String(i + 1).padStart(3, "0"),
    })),
    date: "2024-01-15",
    totalStudents: 42,
    grade: "9",
    section: "A",
    subject: "General",
  },
  "Grade 9 - B": {
    students: Array.from({ length: 41 }, (_, i) => ({
      id: i + 263,
      name: `Student ${String(i + 263).padStart(2, "0")}`,
      status: Math.random() > 0.15 ? (Math.random() > 0.12 ? "present" : "late") : ("absent" as AttendanceStatus),
      rollNumber: String(i + 1).padStart(3, "0"),
    })),
    date: "2024-01-15",
    totalStudents: 41,
    grade: "9",
    section: "B",
    subject: "General",
  },
}

type AttendanceStatus = "present" | "absent" | "late"

interface Student {
  id: number
  name: string
  status: AttendanceStatus
  rollNumber: string
}

interface ClassAttendance {
  students: Student[]
  date: string
  totalStudents: number
  grade: string
  section: string
  subject: string
}

const getStatusIcon = (status: AttendanceStatus) => {
  switch (status) {
    case "present":
      return <CheckCircle className="h-4 w-4 text-green-600" />
    case "absent":
      return <XCircle className="h-4 w-4 text-red-600" />
    case "late":
      return <Clock className="h-4 w-4 text-yellow-600" />
  }
}

const getStatusBadge = (status: AttendanceStatus) => {
  const variants = {
    present: "bg-green-100 text-green-800 border-green-200",
    absent: "bg-red-100 text-red-800 border-red-200",
    late: "bg-yellow-100 text-yellow-800 border-yellow-200",
  }

  return (
    <Badge variant="outline" className={variants[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  )
}

const calculateAttendanceStats = (students: Student[]) => {
  const present = students.filter((s) => s.status === "present").length
  const absent = students.filter((s) => s.status === "absent").length
  const late = students.filter((s) => s.status === "late").length
  const total = students.length
  const presentPercentage = Math.round((present / total) * 100)

  return { present, absent, late, total, presentPercentage }
}

export function AttendancePanel() {
  const [selectedClass, setSelectedClass] = useState<string>("all")
  const [selectedDate, setSelectedDate] = useState<string>("2024-01-15")
  const [attendanceData, setAttendanceData] = useState<Record<string, ClassAttendance>>(mockAttendanceData)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [gradeFilter, setGradeFilter] = useState<string>("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [studentsPerPage] = useState(15)

  // Simulate fetching data based on selected class and date
  useEffect(() => {
    console.log(`Fetching attendance for class: ${selectedClass}, date: ${selectedDate}`)
  }, [selectedClass, selectedDate])

  const classNames = Object.keys(attendanceData)

  const filteredData = useMemo(() => {
    let data = selectedClass === "all" ? attendanceData : { [selectedClass]: attendanceData[selectedClass] }

    // Apply grade filter
    if (gradeFilter !== "all") {
      data = Object.fromEntries(Object.entries(data).filter(([_, classData]) => classData.grade === gradeFilter))
    }

    // Apply search and status filter to students
    const processedData: Record<string, ClassAttendance> = {}

    Object.entries(data).forEach(([className, classData]) => {
      let filteredStudents = classData.students

      // Search filter
      if (searchTerm) {
        filteredStudents = filteredStudents.filter(
          (student) =>
            student.name.toLowerCase().includes(searchTerm.toLowerCase()) || student.rollNumber.includes(searchTerm),
        )
      }

      // Status filter
      if (statusFilter !== "all") {
        filteredStudents = filteredStudents.filter((student) => student.status === statusFilter)
      }

      processedData[className] = {
        ...classData,
        students: filteredStudents,
      }
    })

    return processedData
  }, [attendanceData, selectedClass, gradeFilter, searchTerm, statusFilter])

  const paginatedData = useMemo(() => {
    const result: Record<string, ClassAttendance & { paginatedStudents: Student[]; totalPages: number }> = {}

    Object.entries(filteredData).forEach(([className, classData]) => {
      const totalPages = Math.ceil(classData.students.length / studentsPerPage)
      const startIndex = (currentPage - 1) * studentsPerPage
      const paginatedStudents = classData.students.slice(startIndex, startIndex + studentsPerPage)

      result[className] = {
        ...classData,
        paginatedStudents,
        totalPages,
      }
    })

    return result
  }, [filteredData, currentPage, studentsPerPage])

  const availableGrades = useMemo(() => {
    const grades = new Set(Object.values(attendanceData).map((classData) => classData.grade))
    return Array.from(grades).sort()
  }, [attendanceData])

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, gradeFilter, selectedClass])

  return (
    <div className="container mx-auto p-6 space-y-6 pt-20">
      
       
            <h2 className="text-xl font-semibold text-foreground">Attendance Records</h2>
      

      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Grade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                {availableGrades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="present">Present</SelectItem>
                <SelectItem value="absent">Absent</SelectItem>
                <SelectItem value="late">Late</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setStatusFilter("all")
                setGradeFilter("all")
                setCurrentPage(1)
              }}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Clear Filters
            </Button>
             <Button className=" bg-primary hover:bg-primary/90">
            <Download className="h-4 w-4" />
            Export
          </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(filteredData)
          .slice(0, 4)
          .map(([className, classData]) => {
            const stats = calculateAttendanceStats(classData.students)
            return (
              <Card key={className} className="bg-card border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-card-foreground flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {className}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.presentPercentage}%</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.present}/{stats.total} present
                  </p>
                </CardContent>
              </Card>
            )
          })}
      </div>

      {/* Attendance Details */}
      <div className="grid gap-6">
        {Object.entries(paginatedData).map(([className, classData]) => {
          const stats = calculateAttendanceStats(classData.students)

          return (
            <Card key={className} className="bg-card border-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-primary">{className}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {classData.date} • {stats.total} students{" "}
                      {searchTerm || statusFilter !== "all" ? `(${classData.students.length} total)` : ""}
                    </p>
                  </div>

                  <div className="flex gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-green-600 font-medium">{stats.present} Present</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <XCircle className="h-4 w-4 text-red-600" />
                      <span className="text-red-600 font-medium">{stats.absent} Absent</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-yellow-600" />
                      <span className="text-yellow-600 font-medium">{stats.late} Late</span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-medium text-card-foreground">Roll No.</th>
                        <th className="text-left py-3 px-2 font-medium text-card-foreground">Student Name</th>
                        <th className="text-left py-3 px-2 font-medium text-card-foreground">Status</th>
                        <th className="text-left py-3 px-2 font-medium text-card-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {classData.paginatedStudents.map((student) => (
                        <tr key={student.id} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-2 text-sm font-mono text-muted-foreground">{student.rollNumber}</td>
                          <td className="py-3 px-2 font-medium text-card-foreground">{student.name}</td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              {getStatusIcon(student.status)}
                              {getStatusBadge(student.status)}
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-primary hover:text-primary-foreground hover:bg-primary"
                            >
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {classData.totalPages > 1 && (
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Showing {(currentPage - 1) * studentsPerPage + 1} to{" "}
                      {Math.min(currentPage * studentsPerPage, classData.students.length)} of{" "}
                      {classData.students.length} students
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      <span className="text-sm text-muted-foreground">
                        Page {currentPage} of {classData.totalPages}
                      </span>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(classData.totalPages, prev + 1))}
                        disabled={currentPage === classData.totalPages}
                        className="gap-1"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Footer Summary */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{Object.keys(attendanceData).length}</div>
              <p className="text-sm opacity-90">Total Classes</p>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Object.values(attendanceData).reduce((acc, classData) => acc + classData.totalStudents, 0)}
              </div>
              <p className="text-sm opacity-90">Total Students</p>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Object.values(filteredData).reduce(
                  (acc, classData) => acc + calculateAttendanceStats(classData.students).present,
                  0,
                )}
              </div>
              <p className="text-sm opacity-90">Present Today</p>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Math.round(
                  (Object.values(filteredData).reduce(
                    (acc, classData) => acc + calculateAttendanceStats(classData.students).present,
                    0,
                  ) /
                    Object.values(filteredData).reduce(
                      (acc, classData) => acc + calculateAttendanceStats(classData.students).total,
                      0,
                    )) *
                    100,
                ) || 0}
                %
              </div>
              <p className="text-sm opacity-90">Overall Attendance</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

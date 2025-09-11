import { Navbar } from "@/components/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  UserCheck,
  UserX,
  Calendar,
  BarChart3,
  Clock,
  Plus,
  FileText,
  Settings,
  BookOpen,
  Award,
  AlertCircle,
} from "lucide-react"
import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useDashboard } from "@/hooks/useDashboard"
import { useEffect, useMemo } from "react"

export default function HomePage() {
  // Mock user data - replace with your actual auth logic
 const {user,token}=useAuth()
const navigate = useNavigate()
const {dashboardData,fetchDashboardData}=useDashboard()
  const teacherData = {
    attendanceStats: {
      totalStudents: 156,
      presentToday: 142,
      absentToday: 14,
      attendanceRate: 91.0,
      lateArrivals: 8,
    },
    recentActivity: [
      { action: "Attendance marked", class: "Grade 10A", time: "2 hours ago" },
      { action: "Report generated", class: "Grade 9B", time: "4 hours ago" },
      { action: "Student added", class: "Grade 11C", time: "1 day ago" },
    ],
  }

  const studentData = {
    attendanceStats: {
      totalClasses: 45,
      classesAttended: 42,
      classesAbsent: 3,
      attendanceRate: 93.3,
      lateArrivals: 2,
    },
    recentActivity: [
      { action: "Attended class", class: "Mathematics", time: "2 hours ago" },
      { action: "Assignment submitted", class: "English", time: "1 day ago" },
      { action: "Quiz completed", class: "Science", time: "2 days ago" },
    ],
  }

  const isTeacher = user&&user.role === "teacher"||user&&user.role==="admin"
  const stats = isTeacher ? teacherData.attendanceStats : studentData.attendanceStats
  const recentActivity = isTeacher ? teacherData.recentActivity : studentData.recentActivity

  const handleLogout = () => {
    // Implement your logout logic here
    console.log("Logging out...")
  }
useEffect(() => {
  // fetchDashboardData()
  if((user?.role=='admin'||user?.role=='teacher')&&token){
  fetchDashboardData()}},
   [token,user,fetchDashboardData])
   console.log(dashboardData)
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main content with proper spacing for fixed navbar */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2 text-balance">Welcome back, {user&&user.name}</h1>
            <p className="text-lg text-muted-foreground">
              {isTeacher ? "Here's your attendance overview for today" : "Here's your attendance summary"}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {isTeacher ? (
              <>
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground">{dashboardData?.total_students}</div>
                    <p className="text-xs text-muted-foreground">Across all classes</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Present Today</CardTitle>
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{dashboardData?.present_today}</div>
                    <p className="text-xs text-muted-foreground">Students in attendance</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Absent Today</CardTitle>
                    <UserX className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{(dashboardData?.total_students||0)-(dashboardData?.present_today||0)}</div>
                    <p className="text-xs text-muted-foreground">Students absent</p>
                  </CardContent>
                </Card>
              </>
            ) : (
              <>
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Total Classes</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-card-foreground">{stats.totalClasses}</div>
                    <p className="text-xs text-muted-foreground">This semester</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Classes Attended</CardTitle>
                    <UserCheck className="h-4 w-4 text-green-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{stats?.classesAttended}</div>
                    <p className="text-xs text-muted-foreground">Out of {stats?.totalClasses}</p>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-card-foreground">Classes Missed</CardTitle>
                    <UserX className="h-4 w-4 text-red-600" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{stats?.classesAbsent}</div>
                    <p className="text-xs text-muted-foreground">Absences recorded</p>
                  </CardContent>
                </Card>
              </>
            )}

            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-card-foreground">Attendance Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{((dashboardData?.present_today||0)/(dashboardData?.total_students||1)).toFixed(2)}%</div>
                <p className="text-xs text-muted-foreground">
                  {isTeacher ? "Today's overall rate" : "Your overall rate"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {isTeacher ? (
                <>
                  <Button className="h-auto p-6 flex flex-col items-center gap-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground" onClick={()=>navigate('/mark-attendance')}>
                    <Plus className="h-6 w-6" />
                    <span className="font-medium">Mark Attendance</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center gap-3 border-border hover:bg-muted bg-transparent"
                  >
                    <FileText className="h-6 w-6" />
                    <span className="font-medium">View Reports</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center gap-3 border-border hover:bg-muted bg-transparent"
                  >
                    <Users className="h-6 w-6" />
                    <span className="font-medium">Manage Students</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center gap-3 border-border hover:bg-muted bg-transparent"
                  >
                    <Settings className="h-6 w-6" />
                    <span className="font-medium">Settings</span>
                  </Button>
                </>
              ) : (
                <>
                  <Button className="h-auto p-6 flex flex-col items-center gap-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                    <BarChart3 className="h-6 w-6" />
                    <span className="font-medium">View My Attendance</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center gap-3 border-border hover:bg-muted bg-transparent"
                  >
                    <Calendar className="h-6 w-6" />
                    <span className="font-medium">Class Schedule</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center gap-3 border-border hover:bg-muted bg-transparent"
                  >
                    <Award className="h-6 w-6" />
                    <span className="font-medium">Achievements</span>
                  </Button>

                  <Button
                    variant="outline"
                    className="h-auto p-6 flex flex-col items-center gap-3 border-border hover:bg-muted bg-transparent"
                  >
                    <Settings className="h-6 w-6" />
                    <span className="font-medium">Profile</span>
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Recent Activity & Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium text-card-foreground">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.class}</p>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {activity.time}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Alerts/Notifications */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">{isTeacher ? "Today's Alerts" : "Notifications"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isTeacher ? (
                  <>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <Clock className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Late Arrivals</p>
                        <p className="text-sm text-yellow-700">{stats.lateArrivals} students arrived late today</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Upcoming Events</p>
                        <p className="text-sm text-blue-700">Parent-teacher conference next week</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                      <BarChart3 className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Great Attendance!</p>
                        <p className="text-sm text-green-700">Grade 12A has 100% attendance this week</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                      <Award className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-green-800">Perfect Attendance!</p>
                        <p className="text-sm text-green-700">You've attended all classes this week</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-blue-800">Upcoming Class</p>
                        <p className="text-sm text-blue-700">Mathematics at 10:00 AM tomorrow</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                      <AlertCircle className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-yellow-800">Attendance Goal</p>
                        <p className="text-sm text-yellow-700">You're 2% away from 95% attendance rate</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, Users, BookOpen, GraduationCap } from "lucide-react"
import { useToast } from "@/hooks/useToast"
import { useClass } from "@/hooks/useClass"
import { useAuth } from "@/hooks/useAuth"

interface ClassSection {
  id: number
  className: string
  section: string
  totalStudents: number
}

export default function ClassPage() {
 
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<ClassSection | null>(null)
  const [formData, setFormData] = useState({
    className: "",
    section: "",
    totalStudents: 0,
  })
  const {user,token}=useAuth();
const {classes,fetchClasses,createClass,modifyClass,deleteClass}=useClass();
const {toast} =useToast();
  const handleAddClass = () => {
    setEditingClass(null)
    setFormData({ className: "", section: "", totalStudents: 0 })
    setIsDialogOpen(true)
  }

  const handleEditClass = (classItem: ClassSection) => {
    setEditingClass(classItem)
    setFormData({
      className: classItem.className,
      section: classItem.section,
      totalStudents: classItem.totalStudents,
    })
    setIsDialogOpen(true)
  }

  const handleDeleteClass = (id: number) => {
deleteClass(id)
    toast({
      title: "Class deleted",
      description: "The class has been successfully removed.",
      type:'success'
    })
      fetchClasses(user.school_id)

  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.className || !formData.section) {
      toast({
        title: "Error",
        description: "Please fill in all fields with valid data.",
        type: "error",
      })
      return
    }

    if (editingClass) {
      modifyClass(editingClass.id,{name:formData.className.concat(" ",formData.section)})
      toast({
        title: "Class updated",
        description: "The class has been successfully updated.",
        type:'success'
      })
      fetchClasses(user.school_id)

    } else {
      createClass({
        name:formData.className.concat(" ",formData.section),
        school_id:user?.school_id
      })
      toast({
        title: "Class added",
        description: "The new class has been successfully created.",
        type:'success'
      })
      fetchClasses(user.school_id)

    }

    setIsDialogOpen(false)
    setFormData({ className: "", section: "", totalStudents: 0 })
  }

  const totalStudentsCount = classes.reduce((sum, c) => sum + c.student_count, 0)
useEffect(()=>{
  if(token&&user)fetchClasses(user.school_id)

},[token,user])
  return (
    <div className="min-h-screen bg-background">
   
 
      {/* Main Content */}
      <main className="container pt-20 mx-auto px-6 py-8">
        {/* Stats Overview */}
    
        {/* Classes Grid */}
        <div className="space-y-4">
           
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Class Sections</h2>
            <p className="text-sm text-muted-foreground">{classes.length} classes total</p>
             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={handleAddClass} className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Class
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleSubmit}>
                    <DialogHeader>
                      <DialogTitle>{editingClass ? "Edit Class" : "Add New Class"}</DialogTitle>
                      <DialogDescription>
                        {editingClass
                          ? "Update the class information below."
                          : "Enter the details for the new class section."}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="className">Class Name</Label>
                        <Input
                          id="className"
                          value={formData.className}
                          onChange={(e) => setFormData({ ...formData, className: e.target.value })}
                          placeholder="e.g., Mathematics 101"
                          className="bg-input"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="section">Section</Label>
                        <Input
                          id="section"
                          value={formData.section}
                          onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                          placeholder="e.g., A, B, C"
                          className="bg-input"
                        />
                      </div>
                   
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-primary hover:bg-primary/90">
                        {editingClass ? "Update Class" : "Add Class"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
          </div>

          {classes.length === 0 ? (
            <Card className="bg-card border-border">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-card-foreground mb-2">No classes yet</h3>
                <p className="text-muted-foreground text-center mb-4">Get started by adding your first class section</p>
                <Button onClick={handleAddClass} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Class
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classes.map((classItem) => (
                <Card key={classItem.id} className="bg-card border-border hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-lg text-card-foreground text-balance">
                          {classItem.name.split(" ")[0]}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">Section {classItem.name.split(" ")[1]}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                        <Users className="w-3 h-3 mr-1" />
                        {classItem.student_count}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">{classItem.student_count} students enrolled</div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditClass({
                            className:classItem.name.split(" ")[0],
                            section:classItem.name.split(" ")[1],
                            id:classItem.id,
                            totalStudents:classItem.student_count
                          })}
                          className="h-8 w-8 p-0 border-border hover:bg-accent hover:text-accent-foreground"
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClass(classItem.id)}
                          className="h-8 w-8 p-0 border-border hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

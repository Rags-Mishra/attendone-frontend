import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Grid, InputLabel, Typography,Alert,Dialog,DialogTitle } from "@mui/material";
import AttendanceContext from "../context/attendance/attendanceContext";
import AttendanceSheetComponent from "../components/AttendanceSheetComponent.js";
import StudentContext from "../context/students/studentContext.js";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useLocation,useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
const AttendanceSheet = () => {
  const attendanceContext = useContext(AttendanceContext);
  const studentContext = useContext(StudentContext);
  const { getStudents, students } = studentContext;
  const { markAttendance, error } = attendanceContext;
  const[open,setOpen]=useState(false)
const navigate=useNavigate();
  let location = useLocation();
  useEffect(() => {
    getStudents(location.state.course);
  }, [location.state.course]);
  const [present, setPresent] = useState([]);
  const [absent, setAbsent] = useState([]);
  const course = location.state.course;
  const [date, setDate] = useState(dayjs());
  const onSubmit = (e) => {
    e.preventDefault();
    markAttendance({
      present,
      absent,
      course,
      date,
    });
    {
      if (error != null) {
        alert("Error: ", error);
      } else { setOpen(true)
      }
    }
    // navigate('/teacherscreen')
  };
  return (
    <Grid
      sx={{ marginTop: { xs: "17%", md: "6%" }, justifyContent: "center" }}
      container
    >
      <Dialog open={open} onClose={()=>setOpen(false)}>
      <DialogTitle><Alert severity="success" sx={{width:'15vw'}}>Done</Alert></DialogTitle>


      </Dialog>
      <Grid item md={12} xs={12} sx={{ marginX: "5%", textAlign: "center" }}>
        <InputLabel>Select Date</InputLabel>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            value={date}
            onChange={(newDate) => setDate(newDate)}
            sx={{ height: "20%" }}
          />
        </LocalizationProvider>
      </Grid>
      <Grid
        item
        md={12}
        xs={12}
        sx={{
          height: "1px",
          backgroundColor: "#656565",
          marginX: "3%",
          marginY: "3%",
        }}
      ></Grid>
      <Grid item xs={12} sx={{ paddingX: "5%" }}>
        {students?.map((student) => (
          <AttendanceSheetComponent
            student={student}
            key={student?.id}
            setPresent={setPresent}
            setAbsent={setAbsent}
            absent={absent}
            present={present}
          />
        ))}
      </Grid>

      <Grid item md={12} xs={12}>
        <Button
          type="submit"
          fullWidth
          sx={{
            bgcolor: "#ed7115",
            "&.MuiButtonBase-root:hover": { bgcolor: "#ed7115" },
          }}
          onClick={onSubmit}
        >
          <Typography sx={{ color: "white" }}>Done</Typography>
        </Button>
      </Grid>
    </Grid>
  );
};

export default AttendanceSheet;

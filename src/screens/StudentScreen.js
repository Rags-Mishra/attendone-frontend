import React, { useContext, useEffect } from "react";
import { Grid, Typography, Button, Card, Paper } from "@mui/material";
import { courses } from "../data/courses.js";
import { ArrowForwardIos } from "@mui/icons-material";
import AttendanceContext from "../context/attendance/attendanceContext.js";
import StudentauthContext from "../context/studentauth/studentauthContext.js";
import { useNavigate } from "react-router-dom";
const StudentScreen = () => {
  let navigate = useNavigate();
  const attendanceContext = useContext(AttendanceContext);
  const studentauthContext = useContext(StudentauthContext);
  const { attendances, getAttendances } = attendanceContext;
  const { student } = studentauthContext;
  useEffect(() => {
    getAttendances();
    // calculateAttendedDays()
  }, []);
  return (
    <>
      <Grid
        sx={{
          marginTop: { xs: "15%", md: "5%" },
          backgroundColor: "ButtonShadow",
          padding: "2%",
          height: "90vh",
          display: "flex",
          justifyContent: "center",
        }}
        container
      >
        <Grid
          container
          sx={{
            backgroundColor: "secondary.main",
            alignSelf: "center",
            height: "60vh",
            width: { md: "50vw", xs: "90vw" },
            display: "flex",
            flexDirection: "column",
            borderRadius: 5,
          }}
        >
          <Typography
            variant="h4"
            color="white"
            sx={{ alignSelf: "center", margin: "auto" }}
          >
            Hi {student && student.name}!
          </Typography>
          <Typography variant="h7" color="white" sx={{ margin: "auto" }}>
            Check your attendance
          </Typography>
          {student?.courses?.map((course) => (
            <Grid
              item
              maxHeight={"70px"}
              sx={{ marginRight: "5%", margin: {md:"2%",xs:'5%'} }}
            >
              <Card sx={{ height: "100%" }}>
                <Button
                  endIcon={<ArrowForwardIos />}
                  key={course?.id}
                  fullWidth
                  sx={{ justifyContent: "space-evenly", color: "black" }}
                  onClick={() =>
                    navigate("/studentattendancesheet", {
                      state: { course, attendances },
                    })
                  }
                >
                  <Grid item md={12} xs={12} sx={{ display: "flex" }}>
                    <Typography
                      sx={{
                        color: "ActiveCaption",
                        alignSelf: "flex-start",
                        maxWidth: { xs: "60vw", md: "30vw" },
                        fontSize:{xs:'15px'}
                      }}
                      noWrap
                    >
                      {course}
                    </Typography>
                  </Grid>
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default StudentScreen;

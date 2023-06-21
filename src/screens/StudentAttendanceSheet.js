import React, { useContext, useEffect, useState } from "react";
import moment from "moment/moment.js";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import card2Image from '../assets/leaves-5610361_1280.png';
import card1Image from '../assets/ink-2229457_1280.jpg';
import {
  Grid,
  Typography,
  Badge,
  Button,
  Paper,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { Dayjs } from "dayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { dates } from "../data/dates.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StudentauthContext from "../context/studentauth/studentauthContext.js";
import { Cancel } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
const StudentAttendanceSheet = () => {
  const studentauthContext = useContext(StudentauthContext);
  const { student } = studentauthContext;
  const [attendedDays, setAttendedDays] = useState(0);
  const [count, setCount] = useState(0);
  const [length, setLength] = useState(0);
  const location = useLocation();
  let days=0;
  let totalLength=0;
  const attendances = location.state.attendances;
  useEffect(() => {
    attendances?.map(
      (item) =>
        item?.course === location.state.course &&
        (item?.present?.map((id) =>
          id === student?._id
            ? setAttendedDays(days++)
            : null
        ),setLength(totalLength++))
    );
  }, []);
 
  function ServerDay(props: PickersDayProps<Dayjs>) {
    const { day, outsideCurrentMonth, ...other } = props;
    let value = "";
    attendances?.map((item) =>
      moment(props.day.$d).format("LL") === moment(item?.date).format("LL") &&
      item?.course === location.state.course
        ? item?.present?.map((attendance) =>
            attendance === student._id ? (value = "present") : null
          )
        : null
    );
    const isSelected =
      !props.outsideCurrentMonth && //the days to be highlighted are not outside the current month
      dates.length > 0; //this highlights the days provided in array
    // is selected only true when presence is "yes" and only till the dates length
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        badgeContent={
          isSelected ? (
            value === "present" ? (
              <CheckCircleIcon sx={{ fontSize: "medium", color: "green" }} />
            ) : value === "absent" ? (
              <Cancel sx={{ fontSize: "medium", color: "red" }} />
            ) : null
          ) : null
        }
      >
        <PickersDay
          {...other}
          outsideCurrentMonth={outsideCurrentMonth}
          day={day}
        />
      </Badge>
    );
  }

  return (
    <>
      <Grid
        sx={{ marginTop: { xs: "15%", md: "5%" }, padding: "2%" }}
        container
      >
        <Grid item md={6} xs={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper
              elevation={24}
              sx={{ bgcolor: "secondary.main", padding: "2%", margin: "auto" }}
            >
              <DateCalendar
                sx={{
                  width: { xs: "auto", md: "auto" },
                  height: { xs: "auto", md: "70vw" },
                  backgroundColor: "ButtonShadow",
                  fontSize: "220px",
                }}
                elevation={12}
                slots={{
                  day: ServerDay,
                }}
              />
            </Paper>
          </LocalizationProvider>
        </Grid>
        <Grid
          item
          md={4}
          xs={12}
          sx={{
            marginLeft: { md: "10%", xs: 0 },
            marginTop: { md: 0, xs: "10%" },
          }}
        >
          <Card sx={{ bgcolor: "#0C0C29" }}>
            <CardMedia
              component="img"
              image={card1Image}
              sx={{ height: { md: "30vh", xs: "15vh" } }}
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" color={"white"}>
                Attendance percentage
              </Typography>
              <Typography variant="body2" color="white">
                {Number(
                  ((Math.round(attendedDays/2) * 100) / Math.round(length/2)).toFixed(2)
                )}
                %
              </Typography>
            </CardContent>
          </Card>
          <Card sx={{ bgcolor: "#011E22",marginTop:'5%' }}>
            <CardMedia
              component="img"
              image={card2Image}
              sx={{ height: { md: "30vh", xs: "15vh" } }}
              alt="img"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" color={"white"}>
                Total Classes
              </Typography>
              <Typography variant="body2" color="white">
                {Number(
                  (Math.round(length/2)).toFixed(2)
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
export default StudentAttendanceSheet;

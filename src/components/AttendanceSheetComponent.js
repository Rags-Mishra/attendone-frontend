import React, { useState, useContext } from "react";
import { Grid, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {Paper} from "@mui/material";
const AttendanceSheetComponent = ({
  student,
  setPresent,
  setAbsent,
  present,
  absent,
}) => {
  const [presence, setPresence] = useState("");
  const handleChange = (item) => {
    setPresence(item);
    if (item === "present") {
      setAbsent(absent?.filter((item) => item !== student?._id));
      setPresent((previous) => [...previous, student?._id]);
    } //item==='absent'
    else {
      setPresent(present?.filter((item) => item !== student?._id));
      setAbsent((previous) => [...previous, student?._id]);
    }
  };

  return (
    <>
      {/* <Grid item md={1} xs={1.5}>
        <Avatar src={userimage} />
      </Grid> */}
      <Grid container component={Paper} sx={{marginY:'2%'}} >
      <Grid item md={9} xs={7} alignSelf={'center'}>
        <Typography variant={'button'}sx={{marginX:'5%',fontSize:'15px'}}>{student.name}</Typography>
      </Grid>
      <Grid item md={3} xs={5} sx={{alignItems:"right"}}>
        <FormControl
          fullWidth
          sx={
            presence === "present"
              ? { backgroundColor: "#09C761" }
              : presence === "absent"
              ? { backgroundColor: "#E64444" }
              : null
          }
        >
          <InputLabel id="demo-simple-select-required-label">
            Attendance *
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={presence}
            label="Attendance *"
            onChange={(e) => handleChange(e.target.value)}
            sx={{borderStyle:'solid',borderColor:'#676565'}}
          >
            <MenuItem value={"present"}>Present</MenuItem>
            <MenuItem value={"absent"}>Absent</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      </Grid>
    </>
  );
};

export default AttendanceSheetComponent;

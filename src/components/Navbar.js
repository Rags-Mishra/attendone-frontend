import React, { useState, useContext } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  Button,
  MenuItem,
 Dialog ,DialogActions , DialogContent , DialogContentText , DialogTitle ,Slide
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import AuthContext from "../context/auth/authContext";
import StudentAuthContext from "../context/studentauth/studentauthContext";
import { useNavigate } from "react-router-dom";
const pages = ["Courses"];
const settings = ["Logout"];

function Navbar() {
  let navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const studentauthContext = useContext(StudentAuthContext);
  const { teacher,logout } = authContext;
  const { student,studentlogout } = studentauthContext;
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [loggingout, setLoggingout] = useState(false);
  const handleClick = (setting) => {
    navigate(`/${setting}`)
    setOpen(!open);
  };
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClickOpen = () => {
    setLoggingout(true);
    setOpen2(false);
  };

  const handleClose = () => {
    setLoggingout(false);
  };
  const onLogout=()=>{
    teacher!=null?logout():studentlogout();
    setLoggingout(false);
    navigate('/')
  }
  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EventAvailableIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AttenDone
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* <IconButton
              size="large"
              color="inherit"
              onClick={() => handleOpen()}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              open={open}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={() => setOpen(!open)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {teacher != null &&
                teacher?.courses?.map((course) => (
                  <MenuItem key={course} onClick={() => handleClick()}>
                    <Typography textAlign="center">{course}</Typography>
                  </MenuItem>
                ))}
              {student != null && (
                <MenuItem
                  onClick={() =>
                    handleClick(navigate("/studentattendancesheet"))
                  }
                >
                  <Typography textAlign="center">My Attendance</Typography>
                </MenuItem>
              )}
            </Menu> */}
          </Box>

          <EventAvailableIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AttenDone
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {/* {teacher != null &&
            <Button onClick={() => handleOpen()}>
              <Typography sx={{color:"white"}}>Courses</Typography>
              <Menu
                open={open}
                anchorOrigin={{
                  vertical: "top",
                 horizontal:190
                }}
                onClose={() => setOpen(!open)}
                sx={{
                  display: { md: "block", xs: "none" },
                }}
              >
                
                  {teacher?.courses?.map((course) => (
                    <MenuItem key={course} onClick={() => handleClick()}>
                      <Typography textAlign="center">{course}</Typography>
                    </MenuItem>
                  ))}
              </Menu>
            </Button>} */}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            
            {teacher===null&&student===null? <Button onClick={() => navigate("/login")}>
              <Typography sx={{ color: "white" }}>Login</Typography>
            </Button>:<Tooltip title="Open settings">
              <IconButton sx={{ p: 0 }} onClick={() => setOpen2(!open2)}>
                <Avatar  src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>}
           

            <Menu
              onClose={() => setOpen2(!open2)}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open2}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleClickOpen(!logout)}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <Dialog
        open={loggingout}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure you want to logout?"}</DialogTitle>
        <DialogActions>
          <Button onClick={()=>onLogout()}>Logout</Button>
          <Button onClick={handleClose} color='error'>Cancel</Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
}
export default Navbar;

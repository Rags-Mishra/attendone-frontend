import React, { useState, useContext, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth/authContext";
import StudentAuthContext from "../context/studentauth/studentauthContext";
import {Grid, ToggleButton, ToggleButtonGroup } from "@mui/material";
const Copyright = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        AttenDone
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {
  const authContext = useContext(AuthContext);
  const studentauthContext = useContext(StudentAuthContext);
  const [userType, setUserType] = useState("teacher");
  const { login, error, clearErrors, isAuthenticated } = authContext;
  const { studentlogin, isAuthenticatedStudent } = studentauthContext;
  let navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      // setloggedIn(true);
      navigate("/teacherscreen");
    } else {
      if (isAuthenticatedStudent) {
        // setloggedIn(true);
        navigate("/studentscreen");
      }
    }

    if (error === "User already exists") {
      alert("User already exists");
      clearErrors();
    }
  });

  const { email, password } = user;
  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Please fill in all fields");
    }
    if (userType == "student") {
      studentlogin({
        email,
        password,
      });
    } else {
      login({
        email,
        password,
      });
    }
  };
  const handleChange = (e) => setUserType(e.target.value);
const onTestAccount=()=>{
setUser({email:'test@gmail.com',password:'test@123'})
}
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: "20%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "6%",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box noValidate sx={{ mt: 1}}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={email}
              onChange={onChange}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={password}
              onChange={onChange}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <ToggleButtonGroup
              color="secondary"
              value={userType}
              exclusive
              aria-label="Platform"
              onChange={handleChange}
              sx={{ marginTop: "5%" }}
            >
              <ToggleButton value="teacher" sx={{ fontSize: "60%" }}>
                Teacher
              </ToggleButton>
              <ToggleButton value="student" sx={{ fontSize: "60%" }}>
                Student
              </ToggleButton>
            </ToggleButtonGroup>
            <Grid item>
              <Typography
                sx={{ marginTop: "2%" }}
                variant="body2"
                color="text.secondary"
              >
                Testing the site? <Link onClick={onTestAccount}>Get a test account</Link>
              </Typography>
            </Grid>
            <Button
              onClick={onSubmit}
              fullWidth
              sx={{
                bgcolor: "#ed7115",
                "&.MuiButtonBase-root:hover": { bgcolor: "#ed7115" },
                marginTop: "5%",
              }}
            >
              <Typography sx={{ color: "white" }}>Done</Typography>
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
};
export default Login;

import React from "react";
import Login from "../components/Login";
import { Typography, Grid } from "@mui/material";
import gif from "../assets/27637-welcome.gif";
const Home = () => {
  return (
    <Grid
      container
      sx={{
        marginTop: { md: "6%", xs: "15%" },
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Grid item md={12}>
        <Typography
          sx={{
            fontFamily: "Lucida Handwriting",
            textAlign: "center",
            fontWeight: "bold",
          }}
          color={"primary"}
        >
          Welcome to Attendone!
        </Typography>
        {/* <Grid item md={3} sx={{backgroundColor:"pink",alignSelf:'center'}}>
          <Typography variant="body" wrap textAlign={"center"}>
            A platform where students can easily check thier attendnace in
            various subjects and teachers can easily mark the attendance of
            their students without any hassle
          </Typography>
        </Grid> */}
      </Grid>
      <Grid item md={6} sx={{ marginTop:{md:'2%',xs:'20%'}, alignSelf: "center"}}>
        <lottie-player
          src="https://assets5.lottiefiles.com/private_files/lf30_TBKozE.json"
          background="transparent"
          speed="1"
          style={{ width: "80%", height: "80%" }}
          loop
          autoplay
        ></lottie-player>
      </Grid>
    </Grid>
  );
};

export default Home;

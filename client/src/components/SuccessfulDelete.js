import React from "react";
import { Box, Typography } from "@mui/material";
import { green, lightBlue } from "@mui/material/colors";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Error404() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        flexDirection: "Column",
      }}
    >
      <Typography
        variant="h2"
        style={{ color: "blue", marginTop: "-100px" }}
      ></Typography>
      <Typography variant="h5" sx={{ color: "green" }}>
        <p>Silent departure,</p>
        <p>Virtual ties unthreaded,</p>
        <p>New paths lie ahead.</p>
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </Box>
  );
}

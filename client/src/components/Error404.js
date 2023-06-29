import React from "react";
import { Box, Typography } from "@mui/material";
import { green, lightBlue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Error404() {
  const navigate = useNavigate();

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
      <Typography variant="h1" style={{ color: "blue", marginTop: "-100px" }}>
        404
      </Typography>
      <Typography variant="h5" sx={{ color: "green" }}>
        <p>Page not found, dear friend,</p>
        <p>Lost in the vast digital void,</p>
        <p>Haiku whispers fade.</p>
      </Typography>
      <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
        Go Back
      </Button>
    </Box>
  );
}

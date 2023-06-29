import React from "react";
import { Box, Typography } from "@mui/material";
import { green, lightBlue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: green[500],
    },
    secondary: {
      main: lightBlue[A400],
    },
  },
});
function Error() {
  return <></>;
}
export default Error;

import React, { useState } from "react";

import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useFormik } from "formik";
import * as yup from "yup";
import { syllable } from "syllable";

import Error from "./Error";

const defaultTheme = createTheme();

const PostForm = () => {
  const [errors, setErrors] = useState(null);

  const postSchema = yup.object().shape({
    line1: yup
      .string()
      .test("is-5-syallables", "Line 1 must be 5 syllables", (value) => {
        return syllable(value) == 5;
      })
      .required("Line 1 is required"),
    line2: yup
      .string()
      .test("is-7-syllables", "Line 2 must be 7 syllables", (value) => {
        return syllable(value) == 7;
      })
      .required("Line 2 is required"),
    line3: yup
      .string()
      .test("is-5-syallables", "Line 3 must be 5 syllables", (value) => {
        return syllable(value) == 5;
      })
      .required("Line 3 is required"),
  });

  const formik = useFormik({
    initialValues: {
      line1: "",
      line2: "",
      line3: "",
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      fetch("/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: [values.line1, values.line2, values.line3].join(" \n"),
        }),
      })
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => console.log(data));
          } else {
            res.json().then((error) => setErrors(error.message));
          }
        })
        .catch((error) => setErrors("Haiku not created, please try again"));
    },
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          sx={{
            marginTop: "80px", // Adjust the margin-top value as needed

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                id="line1"
                name="line1"
                placeholder="Line 1"
                value={formik.values.line1}
                variant="standard"
                margin="normal"
                onChange={formik.handleChange}
              />
              <p style={{ color: "red" }}>{formik.errors.line1}</p>
              <TextField
                required
                fullWidth
                id="line2"
                name="line2"
                placeholder="Line 2"
                value={formik.values.line2}
                variant="standard"
                margin="normal"
                onChange={formik.handleChange}
              />
              <p style={{ color: "red" }}>{formik.errors.line2}</p>
              <TextField
                required
                fullWidth
                id="line3"
                name="line3"
                placeholder="Line 3"
                value={formik.values.line3}
                variant="standard"
                margin="normal"
                onChange={formik.handleChange}
              />
              <p style={{ color: "red" }}>{formik.errors.line3}</p>
              {errors ? <Error msg={errors} /> : null}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<HistoryEduIcon />}
              >
                Post
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default PostForm;

import React, { useState } from "react";

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import { useFormik } from "formik";
import * as yup from "yup"

const defaultTheme = createTheme();

const PostForm = () => {
    const [errors, setErrors] = useState([])

    const postSchema = yup.object().shape({
        content: yup.string()
    })

    const formik = useFormik({
        initialValues: {}, 
        validationSchema: postSchema, 
        onSubmit: (values) => {
            fetch("/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
            .then(res => {
                if (res.ok) {
                    res.json()
                    .then(data => console.log(data))
                } else {
                    res.json().then(error => setErrors(error.message))
                }
            })
            .catch(err => console.error(err))
        }
    })
    return(
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="lg">
                <CssBaseline />
            <Box
            component="form"
            sx={{
                marginTop: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}
            >
                <Grid container justifyContent="center" spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                        required
                        fullWidth
                        id="line-1"
                        placeholder="Line 1"
                        variant="standard"
                        margin="normal"
                        />
                        <TextField
                        required
                        fullWidth
                        id="line-2"
                        placeholder="Line 2"
                        variant="standard"
                        margin="normal"
                        />
                        <TextField
                        required
                        fullWidth
                        id="line-3"
                        placeholder="Line 3"
                        variant="standard"
                        margin="normal"
                        />
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
    )
}

export default PostForm
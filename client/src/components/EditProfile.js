import { useState }from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';

import { useFormik } from "formik";
import * as yup from "yup";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const EditProfile = ({ profileUser }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [errors, setErrors] =[]

    const userSchema = yup.object().shape({
        username: yup.string()
        .min(5, "Username must be at least 5 characters")
        .max(20, "Username must be at most 20 characters")
        .test("valid-chs", "Username may only contain letters and numbers", 
            (value) => {
                return /^[A-z0-9]+$/.test(value)
            })
        .required("Username is required"),
        name: yup.string()
        .min(5, "Display name must be at least 5 characters")
        .max(50, "Display name must be at most 20 characters"),
        bio: yup.string()
        .max(200, "Bio must be at most 20 characters")
    })

    const formik = useFormik({
        initialValues: {profileUser},
        validationSchema: userSchema, 
        onSubmit: (values) => {
            fetch("/login", {
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
                    res.json()
                    .then(error => setErrors(error.message))
                }
            })
            .catch(err => console.error(err))
        }
    })

    return (
        <div>
        <Button onClick={handleOpen}>Edit profile</Button>
        <Modal
            open={open}
            onClose={handleClose}
        >
            <Box 
                component="form"
                sx={style}>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    // onChange={formik.handleChange}
                    />
                    {/* <p style={{ color: "red" }}>{formik.errors.username}</p> */}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    required
                    fullWidth
                    id="name"
                    label="Display name"
                    name="name"
                    // onChange={formik.handleChange}
                    />
                    {/* <p style={{ color: "red" }}>{formik.errors.name}</p> */}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    multiline
                    fullWidth
                    id="bio"
                    label="Bio"
                    name="bio"
                    // onChange={formik.handleChange}
                    />
                    {/* <p style={{ color: "red" }}>{formik.errors.bio}</p> */}
                </Grid>
                {/* toggle for private or public account */}
                <FormControlLabel 
                    control={
                        <Switch 
                             // checked={checked}
                            // onChange={handleChange}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    } 
                    label="Public account" />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Save
                </Button>
            </Box>
        </Modal>
        </div>
    );
}

export default EditProfile;
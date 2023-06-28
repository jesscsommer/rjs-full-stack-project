import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Switch from '@mui/material/Switch';
import { FormControlLabel } from '@mui/material';

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
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
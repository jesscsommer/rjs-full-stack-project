import React from "react";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  username: Yup.string().required("Username is required"),
  name: Yup.string().required("Name is required"),
  bio: Yup.string().required("Bio is required"),
});

const ProfileEditModal = ({ open, onClose, profile }) => {
  const initialValues = {
    image: profile?.image || "",
    email: profile?.email || "",
    password: "",
    username: profile?.username || "",
    name: profile?.name || "",
    bio: profile?.bio || "",
  };

  const handleSubmit = (values) => {
    onClose();
  };

  const handleDeleteProfile = () => {
    console.log("Profile deleted");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-container">
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <Field
              name="image"
              type="text"
              as={TextField}
              label="Image URL"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="image" component="div" />

            <Field
              name="email"
              type="email"
              as={TextField}
              label="Email"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="email" component="div" />

            <Field
              name="password"
              type="password"
              as={TextField}
              label="Password"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="password" component="div" />

            <Field
              name="username"
              type="text"
              as={TextField}
              label="Username"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="username" component="div" />

            <Field
              name="name"
              type="text"
              as={TextField}
              label="Name"
              fullWidth
              margin="normal"
            />
            <ErrorMessage name="name" component="div" />

            <Field
              name="bio"
              as={TextField}
              label="Bio"
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <ErrorMessage name="bio" component="div" />

            <Box display="flex" justifyContent="space-between" marginTop="1rem">
              <Button variant="contained" color="primary" type="submit">
                Save Changes
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleDeleteProfile}
              >
                Delete Profile
              </Button>
            </Box>
          </Form>
        </Formik>
      </div>
    </Modal>
  );
};

export default ProfileEditModal;

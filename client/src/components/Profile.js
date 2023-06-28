import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

import PostsContainer from "./PostsContainer";
import ProfileEditModal from "./ProfileEditModal";
import EditProfile from "./EditProfile"

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const drawerHeight = 240;

const Profile = ({ currentUser }) => {
  const { username } = useParams()
  const [profileUser, setProfileUser] = useState({})

  useEffect(() => {
    fetch(`/users/${username}`)
    .then(res => {
      if (res.ok) {
        res.json()
        .then(setProfileUser)
      } else {
        alert("No profile for that user")
      }
    })
    .catch(err => console.error(err))
  }, [username])

  if (!profileUser) return (<h1>Loading...</h1>)

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
      <Drawer
        sx={{
          height: drawerHeight,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            height: drawerHeight,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="top"
      >
        <Toolbar />
        <List>
          <ListItem>
            <Avatar
              alt={profileUser.username}
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
            <h3>{profileUser.username}</h3>
          </ListItem>
          <ListItem>
            <p>
              {profileUser.bio}
            </p>
          </ListItem>
          <ListItem disablePadding>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              {/* Add condition to only show edit option if profile user == current user*/}
              <EditProfile profileUser={profileUser} />
          </ListItem>
        </List>
      </Drawer>
      {/* <ProfileEditModal /> */}
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
        <PostsContainer posts={profileUser.posts} />
        </Box>
      </Box>
    </div>
  );
};

export default Profile;

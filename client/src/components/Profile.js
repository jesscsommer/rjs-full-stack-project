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

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const drawerWidth = 240;

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

  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
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
            <ListItemButton>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              Edit
              <ListItemText />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
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

import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import PostsContainer from "./PostsContainer";
import EditProfile from "./EditProfile";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const drawerHeight = 300;

const Profile = ({ currentUser, updateCurrentUser }) => {
  const navigate = useNavigate()
  const { username } = useParams();
  const [profileUser, setProfileUser] = useState(null);

  const updateProfileUser = (updated_user) => {
    setProfileUser(updated_user);
  };

  useEffect(() => {
    fetch(`/users/${username}`)
      .then((res) => {
        if (res.ok) {
          res.json().then(setProfileUser);
        } else {
          navigate("/404");
        }
      })
      .catch((err) => console.error(err));
  }, [username]);

  return (
    <div>
      <Box>
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
          <Box>
            <Avatar
              alt={profileUser?.username}
              src={`../${profileUser?.profile_pic_num}.png`}
              sx={{ width: 56, height: 56 }}
            />
            <Box>
              <h1>{profileUser?.name}</h1>

              <h3>{profileUser?.username}</h3>
            </Box>
            <ListItem>
              <p>{profileUser?.bio}</p>
            </ListItem>
            {currentUser?.id === profileUser?.id ? (
              <ListItem disablePadding>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <EditProfile
                  profileUser={profileUser}
                  updateProfileUser={updateProfileUser}
                  updateCurrentUser={updateCurrentUser}
                />
              </ListItem>
            ) : null}
          </Box>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
        >
          <PostsContainer posts={profileUser?.posts} currentUser={currentUser} />
        </Box>
      </Box>
    </div>
  );
};

export default Profile;

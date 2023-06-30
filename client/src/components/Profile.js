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
import { Typography } from "@mui/material";

const Profile = ({ currentUser, updateCurrentUser }) => {
  const navigate = useNavigate();
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
    <Box>
      <Drawer
        sx={{
          "& .MuiDrawer-paper": {
            height: 250,
            boxSizing: "border-box",
            marginTop: "60px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            border: "none",
            width: "100vw",
            position: "sticky",
          },
        }}
        variant="permanent"
      >
        <Box sx={{ display: "flex", width: "800px", marginInline: "auto" }}>
          <Avatar
            alt={profileUser?.username}
            src={`../${profileUser?.profile_pic_num}.png`}
            sx={{ width: 200, height: 200 }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: 150,
              maxWidth: 350,
              alignItems: "left",
              mx: "auto",
              my: "auto",
            }}
          >
            <Typography variant="subtitle2">name:</Typography>
            <Typography variant="h6">{profileUser?.name}</Typography>
            <Typography variant="subtitle2">username:</Typography>
            <Typography variant="h6">{profileUser?.username}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2">bio:</Typography>
            <Typography
              variant="subtitle1"
              sx={{
                width: 300,
                my: "auto",
                mx: "auto",
                alignContent: "center",
              }}
            >
              {profileUser?.bio}
            </Typography>

            {currentUser?.id === profileUser?.id ? (
              <ListItem disablePadding>
                <EditProfile
                  profileUser={profileUser}
                  updateProfileUser={updateProfileUser}
                  updateCurrentUser={updateCurrentUser}
                />
              </ListItem>
            ) : null}
          </Box>
        </Box>
      </Drawer>

      <PostsContainer posts={profileUser?.posts} currentUser={currentUser} />
    </Box>
  );
};

export default Profile;

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import EditIcon from "@mui/icons-material/Edit";
import MailIcon from "@mui/icons-material/Mail";
import Avatar from "@mui/material/Avatar";
import PostsContainer from "./PostsContainer";
import ProfileEditModal from "./ProfileEditModal";

const drawerHeight = 240;

const Profile = ({ currentUser }) => {
  return (
    <div>
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
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
              sx={{ width: 56, height: 56 }}
            />
            <h3>User name</h3>
          </ListItem>
          <ListItem>
            <p>
              This is the user's bio. This is the user's bio. This is the user's
              bio. This is the user's bio. This is the user's bio. This is the
              user's bio. This is the user's bio.
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
      <PostsContainer />
      <ProfileEditModal />
    </div>
  );
};

export default Profile;

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import { useNavigate, Link } from "react-router-dom";

function HeaderBar({ currentUser, updateCurrentUser }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logout = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        updateCurrentUser(null);
        navigate("/");
      }
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ zIndex: 9999 }}>
        <Toolbar>
          <Box sx={{ flexGrow: 0 }}>
            <Typography
              variant="h5"
              noWrap
              component={Link}
              to="/"
              sx={{
                mr: 2,
                flexGrow: 1,
                fontFamily: "cursive",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              HaikuHaven
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
          </Box>
          {!currentUser ? (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          ) : (
            <>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={currentUser?.name} src={currentUser?.avatar} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  key="profile"
                  onClick={() => {
                    handleCloseUserMenu();
                  }}
                  component={Link}
                  to={`/profile/${currentUser.username}`}
                >
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem
                  key="logout"
                  onClick={() => {
                    handleCloseUserMenu();
                    logout();
                  }}
                  component={Link}
                  to="/"
                >
                  <Typography textAlign="right">Logout</Typography>
                </MenuItem>
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default HeaderBar;

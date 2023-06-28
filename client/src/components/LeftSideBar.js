import React from "react";
import { NavLink } from "react-router-dom";

function LeftSideBar({ isLoggedIn }) {
  return (
    <div className="nav-bar">
      <img src="" alt="site logo" />
      <h3>Site Name</h3>
      <NavLink to="/home">Home</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      {isLoggedIn ? (
        <NavLink to="/logout">Log Out</NavLink>
      ) : (
        <NavLink to={`/login`}>Login</NavLink>
      )}
    </div>
  );
}

export default LeftSideBar;

import React from "react";
// should we instead use NavLink for these?
// import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <div className="nav-bar">
      <Link to={`/home`}>Home</Link>
      <Link to={`/profile`}>Profile</Link>
      <Link to={`/post`}>Post</Link>
      <Link to={`/login`}>Login</Link>
      <Link to={`/signup`}>Main Menu</Link>
    </div>
  );
}

export default Nav;

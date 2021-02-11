import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom"
import "./NavBar.css" 


function NavBar() {
  return (
    <AppBar position="relative">
      <Toolbar >
          <Link className="link" to="/">Dinnerpool</Link>
          <Link className="link" to="/login">Login</Link>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

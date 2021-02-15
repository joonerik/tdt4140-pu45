import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import "./NavBar.css" ;


function NavBar() {
  return (
    <AppBar position="relative">
      <Toolbar >
          <Link className="link" id="menuLink" to="/">Menu</Link>
          <Link className="link" id="loginLink" to="/login">Login</Link>
          <Link className="link" id="mainLink" to="/">Dinnerpool</Link>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import "./NavBar.css" ;


function NavBar() {
  return (
    <AppBar position="relative">
      <Toolbar >
          <Link className="link" id="menuLink" to="/">MENU</Link>
          <Link className="link" id="mainLink" to="/">DINNERPOOL</Link>
          <Link className="link" id="loginLink" to="/login">LOGIN</Link>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;

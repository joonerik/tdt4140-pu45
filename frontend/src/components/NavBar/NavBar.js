import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import "./NavBar.css" ;


function NavBar() {
  return (
    <div className="topnav">
      <div className="topnav-centered">
        <Link className="link" id="mainLink" to="/">DINNERPOOL</Link>
      </div>
      <Link className="link" id="menuLink" to="/">MENU</Link>
      <Link className="link" id="addLink" to="/">ADD</Link>
      
      <div class="topnav-right">
        <Link className="link" id="registerLink" to="/login">REGISTER</Link>
        <Link className="link" id="loginLink" to="/login">LOGIN</Link>
      </div>
      
    </div>
    // <AppBar className="appBar">
    //   <Toolbar className="toolBar">
    //     <div className="leftLinks">
          // <Link className="link" id="menuLink" to="/">MENU</Link>
          // <Link className="link" id="addLink" to="/">ADD</Link>
    //     </div>
    //     <div className="centerLinks">
          // <Link className="link" id="mainLink" to="/">DINNERPOOL</Link>
    //     </div>
    //     <div className="rightLinks">
          // <Link className="link" id="registerLink" to="/login">REGISTER</Link>
          // <Link className="link" id="loginLink" to="/login">LOGIN</Link>
    //     </div>
    //   </Toolbar>
    // </AppBar>
  );
}

export default NavBar;

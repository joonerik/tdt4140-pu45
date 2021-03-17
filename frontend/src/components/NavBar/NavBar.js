import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css" ;
import { useAuth } from '../UserContext/auth'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


function NavBar() {

  const { authTokens } = useAuth();
  const { setAuthTokens } = useAuth();

  function logOut() {
    confirmAlert({
      title: 'Log out?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            setAuthTokens()
          }
        },
        {
          label: 'No',
        }
      ]
    });
  }

  return (
    <div className="topnav">
      <div className="topnav-centered">
        <Link className="link" id="mainLink" to="/">DINNERPOOL</Link>
      </div>
      <Link className="link" id="menuLink" to="/">MENU</Link>
      <Link className="link" id="addLink" to="/add">ADD</Link>
      
      <div className="topnav-right">
        {authTokens 
        ? <div>
            <Link className="link" id="registerLink" to="/profile">PROFILE</Link>
            <Link className="link" id="registerLink" to="/" onClick={logOut}>LOG OUT</Link>
          </div>
        : <div>
            <Link className="link" id="registerLink" to="/register">REGISTER</Link>
            <Link className="link" id="loginLink" to="/login">LOGIN</Link>
          </div>
        }
        
      </div>
      
    </div>
  );
}

export default NavBar;

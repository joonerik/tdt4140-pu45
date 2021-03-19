import React from 'react';
import { useAuth } from '../components/UserContext/auth';
import './style/Profile.css';
import { Link } from "react-router-dom";

const Profile = () => {

    const { setAuthTokens } = useAuth();
    const { authTokens } = useAuth();

    function logOut() {
        setAuthTokens();
    }

    return (
        <div>
            <h1>Hello, X</h1>
            <p>First name:</p>
            <p>Last name:</p>
            <p>Phone number: </p>
            <p>{authTokens.refresh}</p>
            <p>{authTokens.access}</p>
            <button className="logoutButton">
                <Link className="logoutLink" id="registerLink" to='/' onClick={logOut}>LOG OUT</Link>
            </button>
        </div>
    )
}

export default Profile

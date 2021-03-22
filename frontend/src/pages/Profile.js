import React from 'react';
import { useAuth } from '../components/UserContext/auth';
import './style/Profile.css';
import { Link } from "react-router-dom";

const Profile = () => {

    const { setAuthTokens } = useAuth();

    function logOut() {
        setAuthTokens();
        localStorage.removeItem('userData');
        localStorage.removeItem('tokens');
        localStorage.setItem('user', false);
    }

    return (
        <div>
            <h1>Hello, X</h1>
            <p>First name:</p>
            <p>Last name:</p>
            <p>Phone number: </p>
            {localStorage.getItem('user')
            ?   
                <div>
                    <p>ID: {JSON.parse(localStorage.getItem('userData')).id}</p>
                    <p>Username: {JSON.parse(localStorage.getItem('userData')).username}</p>
                    <p>E-mail: {JSON.parse(localStorage.getItem('userData')).email}</p>
                    <p>Passord: {JSON.parse(localStorage.getItem('userData')).password}</p>
                </div>
            : null }
            <button className="logoutButton">
                <Link className="logoutLink" id="registerLink" to='/' onClick={logOut}>LOG OUT</Link>
            </button>
        </div>
    )
}

export default Profile

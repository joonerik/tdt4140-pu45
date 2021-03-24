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
            {localStorage.getItem('user')
            ?   
                <div>
                    <h1>Hello, {(JSON.parse(localStorage.getItem('dinner')).email).substr(0, (JSON.parse(localStorage.getItem('dinner')).email).indexOf('@'))}</h1>
                    <p>E-mail: {JSON.parse(localStorage.getItem('userData')).email}</p>
                </div>
            : null }
            <button className="logoutButton">
                <Link className="logoutLink" id="registerLink" to='/' onClick={logOut}>LOG OUT</Link>
            </button>
        </div>
    )
}

export default Profile

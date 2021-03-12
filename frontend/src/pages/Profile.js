import React from 'react'
import { useAuth } from '../components/UserContext/auth'

const Profile = () => {

    const { setAuthTokens } = useAuth();

    function logOut() {
        setAuthTokens();
    }

    return (
        <div className="box">
            <ul className="dinnerInfo">
                <h1>fff</h1>
                <li>HOST:</li>
                <li>E-MAIL:</li>
                <li>LOCATION: </li>
            </ul>
            <button onClick={logOut}>Log out</button>
        
        </div>
    )
}

export default Profile

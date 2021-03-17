import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from './components/UserContext/auth'

function PrivateRoute({ component: Component, ...rest }) {

  const isAuthenticated = useAuth();
  const { authTokens } = useAuth();

  
  return(
    <Route {...rest} render={(props) => (
        authTokens 
        ? <Component {...props} />
        : <Redirect to='/login'/>
        )}
    />
  );
}

export default PrivateRoute;
import "./App.css";
import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DinnerOverview from "./pages/DinnerOverview";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer"
import DinnerForm from "./pages/DinnerForm";
import Profile from "./pages/Profile";
import RegisterPage from "./pages/RegisterPage";
import { AuthContext } from './components/UserContext/auth'
import PrivateRoute from './PrivateRoute'

function App(props) {

  const [authTokens, setAuthTokens] = useState(false);

  const setTokens = (data) => {
    localStorage.setItem('tokens', JSON.stringify(data));
    // console.log(JSON.stringify(data))
    // console.log(data)
    setAuthTokens(data)
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <div className="App">
          <Router>
            <NavBar />
            <Switch>
              <Route component={DinnerOverview} exact path="/" />
              <Route component={LoginPage} path="/login" />
              {/* <Route component={DinnerForm} path="/add" /> */}
              <Route component={RegisterPage} path="/register" />
              {/* <Route component={Profile} path="/profile" /> */}
              <PrivateRoute path="/add" component={DinnerForm} />
              <PrivateRoute path="/profile" component={Profile} />
              <Route data-testid="elseLink" component={NoMatch} />
            </Switch>
            <Footer/>
          </Router>
      </div>
    </AuthContext.Provider>
  );
}

function NoMatch({ location }) {
  return (
    <div>
      <br></br>
      <h3>
        404 - No match for <code>{location.pathname}</code>
      </h3>
    </div>
  )
}

export default App;

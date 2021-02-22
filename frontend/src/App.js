import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DinnerOverview from "./pages/DinnerOverview";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import DinnerForm from "./pages/DinnerForm";

function App() {
  return (
    <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route component={DinnerOverview} exact path="/" />
            <Route component={LoginPage} path="/login" />
            <Route data-testid="elseLink" component={NoMatch} />
          </Switch>
          <Footer/>
        </Router>

    </div>
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

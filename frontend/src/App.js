import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DinnerOverview from "./pages/DinnerOverview";
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route component={DinnerOverview} exact path="/" />
            <Route component={LoginPage} path="/login" />
          </Switch>
          <Footer/>
        </Router>

    </div>
  );
}

export default App;

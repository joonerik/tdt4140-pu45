import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import DinnerOverview from "./pages/DinnerOverview";

function App() {
  return (
    <div className="App">
      <DinnerOverview />
    </div>
  );
}

export default App;

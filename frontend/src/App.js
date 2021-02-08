import "./App.css";
import "./components/DinnerBox/DinnerBox";
import DinnerBox from "./components/DinnerBox/DinnerBox";
import DinnerList from "./components/DinnerList/DinnerList";

const test = {
  overview: [
    { id: 1, location: "Møllenberg", course: "Pizza" },
    { id: 2, location: "Nardo", course: "Taco" },
  ],
};
function App() {
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <DinnerList overview={test} />
    </div>
  );
}

export default App;

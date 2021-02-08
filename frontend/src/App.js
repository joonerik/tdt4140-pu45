import "./App.css";
import "./components/DinnerBox/DinnerBox";
import DinnerBox from "./components/DinnerBox/DinnerBox";

const test = {
  items: [
    { id: 1, name: "Apples", price: "$2" },
    { id: 2, name: "Peaches", price: "$5" },
  ],
};
function App() {
  return (
    <div className="App">
      <h1>Hello, World!</h1>
      <DinnerBox go={test} />
    </div>
  );
}

export default App;

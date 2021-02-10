import "./App.css";
import "./components/DinnerBox/DinnerBox";
import DinnerBox from "./components/DinnerBox/DinnerBox";
import DinnerList from "./components/DinnerList/DinnerList";

const test = {
  overview: [
    {
      id: 1,
      title: "tittel1",
      description: "enjoy",
      location: "Møllenberg",
      course: "Pizza",
      host: "Andrea",
      capacity: 5,
    },
    {
      id: 2,
      title: "tittel2",
      description: "hehe",
      location: "Berg",
      course: "Taco",
      host: "Donny",
      capacity: 5,
    },
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

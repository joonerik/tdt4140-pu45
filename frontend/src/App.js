import "./App.css";
import "./components/DinnerBox/DinnerBox";
import DinnerOverview from "./pages/DinnerOverview";

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
      <DinnerOverview overview={test}></DinnerOverview>
      {/* <DinnerList overview={test} /> */}
    </div>
  );
}

export default App;

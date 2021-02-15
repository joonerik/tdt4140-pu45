import React from 'react';
import DinnerBox from '../DinnerBox/DinnerBox';
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

// const data = [
//     {
//         "title": "Fisk",
//         "beskrivelse": "Fisk",
//         "food": "Fisk",
//         "location": "Norge",
//         "host": "Ikke midt i en pandemi!",
//         "capacity": 69
//     }
// ]


// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<DinnerBox card={data[0]}></DinnerBox>, div);
// });

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


it('renders dummy data', async () => {
  const data = 
    {
        "title": "Fisk",
        "beskrivelse": "Fisk",
        "food": "Fisk",
        "location": "Norge",
        "host": "Ikke midt i en pandemi!",
        "capacity": 69
    };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(data)
    })
  );

  await act(async () => {
    render(<DinnerBox card={data}></DinnerBox>, container)
  })

  expect(container.querySelector('h1').textContent).toBe(data.title.toUpperCase())

  global.fetch.mockRestore();

})
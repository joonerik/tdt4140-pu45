import React from 'react';
import DinnerBox from "../../../components/DinnerBox/DinnerBox"
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

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
      "id": 1,
      "title": "Kakestraff",
      "description": "Beate lager kake til neste gang, justice.",
      "host": "localhost",
      "email": "fernando@torres.com",
      "phone": "98989898",
      "capacity": 100,
      "location": "A4",
      "date_event": "2021-02-21T12:30:00Z",
      "courses": [
          "https://dinnerpool.herokuapp.com/courses/3/"
      ],
      "price": 0.0,
      "split_bill": false,
      "contains_gluten": true,
      "contains_lactose": true,
      "contains_nut": true,
      "contains_shellfish": false,
      "other_allergens": "meget god stemning"
    };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(data)
    })
  );

  await act(async () => {
    render(<DinnerBox card={data}></DinnerBox>, container)
  })

  expect(container.querySelector('h1').textContent).toBe(data.title)

  global.fetch.mockRestore();

})
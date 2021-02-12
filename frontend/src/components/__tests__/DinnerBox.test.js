import React from 'react';
import ReactDOM from 'react-dom';
import DinnerBox from '../DinnerBox/DinnerBox';

const data = [
    {
        "title": "Fisk",
        "beskrivelse": "Fisk",
        "food": "Fisk",
        "location": "Norge",
        "host": "Ikke midt i en pandemi!",
        "capacity": 69
    }
]


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DinnerBox card={data[0]}></DinnerBox>, div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import DinnerList from '../../DinnerList/DinnerList';
import App from '../../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App><DinnerList /></App>, div);
});
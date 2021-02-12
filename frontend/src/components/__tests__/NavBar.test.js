import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from '../NavBar/NavBar';
import App from '../../App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App><NavBar /></App>, div);
});
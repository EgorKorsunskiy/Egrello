import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { BoardState } from './SingleTon/state';

const boardState = new BoardState();

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <App boardState={boardState}/>
    </React.StrictMode>
  </Router>,
  document.getElementById('root')
);

reportWebVitals();

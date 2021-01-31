import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { BoardState } from './SingleTon/state';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const boardState = new BoardState();

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Router>
      <React.StrictMode>
        <App boardState={boardState}/>
      </React.StrictMode>
    </Router>
  </DndProvider>,
  document.getElementById('root')
);

reportWebVitals();

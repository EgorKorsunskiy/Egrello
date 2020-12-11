import './App.css';
import { useState } from 'react'
import { Route, Switch } from 'react-router-dom';
import { MainPage } from './Main';
import { Board } from './Board';
import { BoardState } from './state';
import { observer } from 'mobx-react-lite';

function App() {
  const [color, setColor] = useState('rgb(0, 121, 191)');
  const boardState = new BoardState();

  return (
    <div className="App">
      <header style={{background: color}}>
        <div className='search-container'>
          <input type='text' className='search-input' style={{background: color, filter: 'brightness(115%)'}}/>
          <button className='search-button' style={{background: color, filter: 'brightness(115%)'}}>
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.5 18a7.5 7.5 0 115.936-2.915l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006A7.467 7.467 0 0110.5 18zm5.5-7.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
        <div className='title-container'>
          <h2 className='title'>Egoor4io</h2>
        </div> 
      </header>
        <Switch>
          <Route path='/board/:id' render={() => (
            <Board boardState={boardState}/>
          )} />

          <MainPage 
            boardState={boardState}
            updateColor={setColor} 
            />
        </Switch>
    </div>
  );
}

export default observer(App);

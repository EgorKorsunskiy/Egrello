import { useState } from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import { MainPage } from './Main';
import { Board } from './Board';
import { observer } from 'mobx-react-lite';
import styles from './App.module.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { FilteredBoards } from './Main/Filtered';

const tinycolor = require('tinycolor2');

function App(props) {

  const [title, setTitle] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [color, setColor] = useState(props.boardState.getDefaultColor());
  const brightenColor = tinycolor(color).brighten(15).toString();

  return (
    <div>
      <header style={{background: color}}>
        <div className={styles['search-container']}>
          <Link to='' style={{display: "flex"}}>
              <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24" className={styles['home-button']} style={{background: brightenColor}} onClick={() => {setColor(props.boardState.getDefaultColor());setIsSearching(false)}}>
                <path fillRule="evenodd" clipRule="evenodd" d="M3.586 10.414A2 2 0 003 11.828V19a2 2 0 002 2h5a1 1 0 001-1v-6h2v6a1 1 0 001 1h5a2 2 0 002-2v-7.172a2 2 0 00-.586-1.414l-7.707-7.707a1 1 0 00-1.414 0l-7.707 7.707zM13 12a2 2 0 012 2v5h4v-7.172l-7-7-7 7V19h4v-5a2 2 0 012-2h2z" fill="currentColor"></path>
              </svg>
          </Link>
          <input type='text' className={styles['search-input']} style={{background: brightenColor}} onInput={(e) => setTitle(e.target.value)}/>
          <button className={styles['search-button']} style={{background: brightenColor}} onClick={() => setIsSearching(true)}>
            <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.5 18a7.5 7.5 0 115.936-2.915l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006A7.467 7.467 0 0110.5 18zm5.5-7.5a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z" fill="currentColor"></path>
            </svg>
          </button>
        </div>
        <div className={styles['title-container']}>
          <h2 className={styles['title']}>Egoor4io</h2>
        </div> 
      </header>
        <Switch>
          <Route path='/board/:id' render={() => (
            <DndProvider backend={HTML5Backend}>
              <Board boardState={props.boardState}/>
            </DndProvider>
          )} />

          {
          isSearching?
          <FilteredBoards 
            boardState={props.boardState}
            searchText={title}
            setIsSearching={setIsSearching}
            updateColor={setColor} 
          />:
          <MainPage 
            boardState={props.boardState}
            updateColor={setColor} 
            />
            }
        </Switch>
    </div>
  );
}

export default observer(App);

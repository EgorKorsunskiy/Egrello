import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Table } from './Table';
import styles from './index.module.css';

const tinycolor = require('tinycolor2');

export const Board = (props) => {

    const {id} = useParams();
    const currentBoard = props.boardState.boards.filter(el => el.id == id)[0];

    const brightenColor = tinycolor(currentBoard.color).brighten(15).toString();

    const [isAddBoardFormOpen, setIsAddBoardFormOpen] = useState(false);
    const [title, setTitle] = useState('');

    const drawTables = () => {
        const Elements = [];

        currentBoard.tables.map((table, index) => {
            Elements.push(
                <Table 
                    table={table}
                    board={currentBoard}
                    color={currentBoard.color}
                    key={index}
                />
            );
        })

        return Elements;
    }

    return (
        <div className={styles['body']}>
            {drawTables()}
            {
            !isAddBoardFormOpen?
            <div className={styles['addTableButton']} style={{background: currentBoard.color}} onClick={() => setIsAddBoardFormOpen(true)}>
                <p className={styles['pPlus']}>+</p>
                <p className={styles['p']}>Добавить таблицу</p>
            </div>:
            <div className={styles['addTableForm']} style={{background: currentBoard.color}}>
                <input type='text' placeholder='Ввидите название таблици' className={styles['input']} style={{background: brightenColor}} onInput={(e) => setTitle(e.target.value)}/>
                <div className={styles['buttonContainer']}>
                    {
                        title?
                        <button className={styles['button']} style={{background: brightenColor}} onClick={() => {currentBoard.addTable(title); setIsAddBoardFormOpen(false); setTitle('')}}>Создать</button>:
                        <button className={styles['button_disable']} style={{background: brightenColor}}>Создать</button>
                    }
                    <button className={styles['button']} style={{background: brightenColor}} onClick={() => {setIsAddBoardFormOpen(false); setTitle('')}}>Закрыть</button>
                </div>
            </div>
            }
        </div>
    )
}
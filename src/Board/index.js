import { useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Table } from './Table';
import styles from './index.module.css';
import { observer } from 'mobx-react-lite';
import { useDrop } from 'react-dnd';
import { swap } from '../utilits';

const tinycolor = require('tinycolor2');
const requirementClassName = '.toFindTables';

const WINDOW_SQUARE = window.innerWidth * window.innerHeight;

export const Board = observer((props) => {


    useEffect(() => () => {
        props.setIsFiltered(false);
    },[])

    const {id} = useParams();
    const currentBoard = props.boardState.boards.find(el => el.id === id);
    const brightenColor = tinycolor(currentBoard.color).brighten(15).toString();

    const [isAddBoardFormOpen, setIsAddBoardFormOpen] = useState(false);
    const [title, setTitle] = useState('');
    const Xcoords = useRef(0);
    const Ycoords = useRef(0);

    const [{item},drop] = useDrop({
        accept: 'table',
        hover: (item,monitor) => {
            const {x, y} = monitor.getSourceClientOffset();
            Xcoords.current = x;
            Ycoords.current = y;
        },
        drop: () => {
            let tables = Array.from(document.querySelectorAll(requirementClassName));
            tables = tables.filter(table => table.dataset.id !== item.TableId);
            let tablesCoords = tables.map(table => {
              let rect = table.getBoundingClientRect();
              return [rect.x, rect.y];
            });

            let minDistance = WINDOW_SQUARE;
            let minDistanceIndex = 0;
           
            tablesCoords.forEach(tableoCord => {
                let distance = Math.hypot(tableoCord[0]-Xcoords.current, tableoCord[1]-Ycoords.current);
                if(distance < minDistance){
                   minDistanceIndex += (minDistance === WINDOW_SQUARE)?0:1;
                   minDistance = distance;
                }
              });
              let tableIndex = currentBoard.tables.findIndex(table => table.id === tables[minDistanceIndex].dataset.id);
              let fromTableIndex = currentBoard.tables.findIndex(table => table.id === item.TableId);

              const tempIndex = fromTableIndex;
 
              fromTableIndex = tableIndex;
              tableIndex = tempIndex;
 
              swap(currentBoard.tables,fromTableIndex,tableIndex);
       },
       collect: (monitor) => ({item: monitor.getItem()})
    });

    const drawTables = () => {
        const Elements = [];

        const tables = props.isFiltered?
        currentBoard.tables.filter(table => table.name.includes(props.searchText)):
        currentBoard.tables;

        tables.forEach((table, index) => {
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
        <div className={styles['body']} ref={drop}>
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
})
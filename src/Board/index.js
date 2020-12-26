import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { Table } from './Table';
import styles from './index.module.css';
import { observer } from 'mobx-react-lite';
import { useDrop } from 'react-dnd';

const tinycolor = require('tinycolor2');
const requirementClassName = '.toFindTables';

const WINDOW_SQUARE = window.innerWidth * window.innerHeight;

export const Board = observer((props) => {

    const {id} = useParams();
    const currentBoard = props.boardState.boards.find(el => el.id === id);

    const brightenColor = tinycolor(currentBoard.color).brighten(15).toString();

    const [isAddBoardFormOpen, setIsAddBoardFormOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [Xcoords, setX] = useState(0);
    const [Ycoords, setY] = useState(0);

    const [{item},drop] = useDrop({
        accept: 'table',
        hover: (item,monitor) => {
            const {x, y} = monitor.getSourceClientOffset();
            setX(x);
            setY(y);
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
                let distance = Math.hypot(tableoCord[0]-parseInt(Xcoords), tableoCord[1]-parseInt(Ycoords));
                if(distance < minDistance){
                   minDistanceIndex += (minDistance === WINDOW_SQUARE)?0:1;
                   minDistance = distance;
                }
              });

              let table = currentBoard.tables.find(table => table.id === tables[minDistanceIndex].dataset.id);
              let tableIndex = currentBoard.tables.indexOf(table);
              let fromTableCards = table.cards;
              const fromTable = currentBoard.tables.find(table => table.id === item.TableId);
              let fromTableIndex = currentBoard.tables.indexOf(fromTable);
              let tableCards = fromTable.cards;

              const tempIndex = fromTableIndex;
              const tempCards = fromTableCards;
 
              fromTableIndex = tableIndex;
              fromTableCards = tableCards;
 
              tableIndex = tempIndex;
              tableCards = tempCards;
 
              currentBoard.swapTables(fromTable, fromTableIndex, fromTableCards, table, tableIndex, tableCards);
       },
       collect: (monitor) => ({item: monitor.getItem()})
    });

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
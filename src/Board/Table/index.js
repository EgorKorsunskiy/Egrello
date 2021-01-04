import { observer } from 'mobx-react-lite';
import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Card } from './Card';
import styles from './index.module.css';

const tinycolor = require('tinycolor2');
const requirementClassName = '.toFindCards';

const WINDOW_SQUARE = window.innerWidth * window.innerHeight;

export const Table = observer((props) => {

    const Xcoords = useRef(0);
    const Ycoords = useRef(0);

    const [{item}, drop] = useDrop({
        accept: 'card',
        hover: (item,monitor) => {
            const {x, y} = monitor.getSourceClientOffset();
            Xcoords.current = x;
            Ycoords.current = y;
        },
        drop: () => {
             let cards = Array.from(document.querySelectorAll(requirementClassName));
             cards = cards.filter(card => card.dataset.id !== item.CardId);
             let cardsCoords = cards.map(card => {
               let rect = card.getBoundingClientRect();
               return [rect.x, rect.y];
             });

             let minDistance = WINDOW_SQUARE;
             let minDistanceIndex = 0;
            
             cardsCoords.forEach(cardCoord => {
                 let distance = Math.hypot(cardCoord[0]-Xcoords.current, cardCoord[1]-Ycoords.current);
                 if(distance < minDistance){
                    minDistanceIndex += (minDistance === WINDOW_SQUARE)?0:1;
                    minDistance = distance;
                 }
               });
             let cardIndex = props.table.cards.findIndex(card => card.id === cards[minDistanceIndex].dataset.id);
             const card = props.table.cards[cardIndex];
             const fromTable = props.board.tables.find(table => table.id === item.TableId);
             let fromCardIndex = fromTable.cards.findIndex(card => card.id === item.CardId);
             const fromCard = fromTable.cards[fromCardIndex];
             if(fromTable.id === props.table.id){
                const temp = fromCardIndex;

                fromCardIndex = cardIndex;

                cardIndex = temp;

                fromTable.swapCards(fromCardIndex,cardIndex);
             }
             else{
                props.table.addCardAtIndex(fromCard.name, card?cardIndex+1:0);
                fromTable.deleteCard(fromCard.id);
             }
        },
        collect: (monitor) => ({item: monitor.getItem()})
    })

    const [, drag] = useDrag({
        item: {
        type: 'table',
        TableId: props.table.id,
    }
    })

    const brightenColor = tinycolor(props.color).brighten(15).toString();

    const [isCreateCardFormOpen, setIsCreateCardFormOpen] = useState(false);
    const [title, setTitle] = useState('');

    const drawCards = () => {
        const Elements = [];

        props.table.cards.map((card, index) => {
            Elements.push(
                <Card 
                    card={card}
                    table={props.table}
                    color={brightenColor}
                    key={index}
                />
            );
        })

        return Elements;
    }

    return(
        <div className={styles['body']} style={{background: props.color}} ref={drop}>
            <div className='toFindTables' ref={drag} data-id={props.table.id}>
                <p className={styles['title']}>{props.table.name}</p>
                <div className={styles['cardContainer']}>
                    {drawCards()}
                </div>
            {
                !isCreateCardFormOpen?
                <button className={styles['button']} style={{background: brightenColor, marginTop: '7px'}} onClick={() => setIsCreateCardFormOpen(true)}>Добавить Карточку</button>:
                <div className={styles['addTableForm']} style={{background: props.color}}>
                    <input type='text' placeholder='Ввидите название таблици' className={styles['input']} style={{background: brightenColor}} onInput={(e) => setTitle(e.target.value)}/>
                    <div className={styles['buttonContainer']}>
                        {
                            title?
                            <button className={styles['button'] + ' ' + styles['fixedSizeButton']} style={{background: brightenColor}} onClick={() => {props.table.addCard(title); setIsCreateCardFormOpen(false); setTitle('')}}>Создать</button>:
                            <button className={styles['button_disable']} style={{background: brightenColor}}>Создать</button>
                        }
                        <button className={styles['button'] + ' ' + styles['fixedSizeButton']} style={{background: brightenColor}} onClick={() => {setIsCreateCardFormOpen(false); setTitle('')}}>Закрыть</button>
                    </div>
                </div>
            }
            <button className={styles['button'] + ' ' + styles['fixedSizeButton']} style={{background: brightenColor, marginTop: '3%'}} onClick={() => {props.board.deleteTable(props.table.id); setTitle('')}}>Удалить</button>
        </div>
        </div>
    );
})
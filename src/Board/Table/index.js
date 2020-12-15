import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from './Card';
import styles from './index.module.css';

const tinycolor = require('tinycolor2');

const CARD_HEIGHT = 21;
const CARD_OFFSET = (window.innerHeight / 100) * 3;
const CARD_HEIGHT_WITH_OFFSET = CARD_HEIGHT + CARD_OFFSET;
const TABLE_TOP_OFFSET = ((window.innerHeight / 100) * 2.5) + CARD_HEIGHT;
const HEADER_OFFSET = (window.innerHeight / 100) * 6.5

export const Table = (props) => {

    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const [{item}, drop] = useDrop({
        accept: 'card',
        drop: () => {
            const fromTable = props.board.tables.filter(table => table.id == item.TableId)[0];
            const card = fromTable.cards.filter(card => card.id == item.CardId)[0];
            const cardId = props.table.cards.length?
                Math.floor(((y - (TABLE_TOP_OFFSET + HEADER_OFFSET))) / CARD_HEIGHT_WITH_OFFSET):
                0
            props.table.addCardAtIndex(card.name, cardId);
            fromTable.deleteCard(card.id);
        },
        collect: (monitor) => ({item: monitor.getItem()})
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
                    setX={setX}
                    setY={setY}
                    key={index}
                />
            );
        })

        return Elements;
    }

    return(
        <div className={styles['body']} style={{background: props.color}} ref={drop}>
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
        </div>
    );
}
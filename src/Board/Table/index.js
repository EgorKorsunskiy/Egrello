import { useState } from 'react';
import { useDrop } from 'react-dnd';
import { Card } from './Card';
import styles from './index.module.css';

const tinycolor = require('tinycolor2');

export const Table = (props) => {

    const [Xcoords, setX] = useState(0);
    const [Ycoords, setY] = useState(0);

    const [{item}, drop] = useDrop({
        accept: 'card',
        hover: (item,monitor) => {
            const {x, y} = monitor.getSourceClientOffset();
            setX(x);
            setY(y);
        },
        drop: () => {
             let cards = Array.from(document.querySelectorAll('.toFind'));
             let cardsCoords = cards.map(link => {
               let rect = link.getBoundingClientRect();
               return [rect.x, rect.y];
             });
            
             let distances = [];
            
             cardsCoords.forEach(cardCoord => {
                 let distance = Math.hypot(cardCoord[0]-parseInt(Xcoords), cardCoord[1]-parseInt(Ycoords));
                 distances.push(parseInt(distance));
               });
            
             let closestLinkIndex = distances.indexOf(Math.min(...distances));
             let card = props.table.cards.find(card => card.id == cards[closestLinkIndex].dataset.id);
             const fromTable = props.board.tables.filter(table => table.id == item.TableId)[0];
             const fromCard = fromTable.cards.filter(card => card.id == item.CardId)[0];
             if(fromTable.id == props.table.id){
                const fromCardIndex = fromCard.index;

                fromCard.index = card.index;

                card.index = fromCardIndex;

                fromTable.deleteCard(fromCard.id);
                fromTable.deleteCard(card.id)

                fromTable.addCardAtIndex(fromCard.name, fromCard.index);
                fromTable.addCardAtIndex(card.name, card.index);
             }
             else{
                props.table.addCardAtIndex(fromCard.name, card?card.index:0);
                fromTable.deleteCard(card, fromCard);
             }
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
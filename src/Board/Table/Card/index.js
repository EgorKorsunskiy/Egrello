import { useDrag } from 'react-dnd';
import { Draggable } from './Draggable/Draggable';
import styles from './index.module.css';

export const Card = (props) => {

    const [, drag] = useDrag({
        item: {
        type: 'card',
        TableId: props.table.id,
        CardId: props.card.id
    }
    })

    return(
        <Draggable setX={props.setX} setY={props.setY}>
            <div className={styles['body']} style={{background: props.color}} ref={drag}>{props.card.name}</div>
        </Draggable>
    );
}
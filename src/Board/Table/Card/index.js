import { useDrag } from 'react-dnd';
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
        <div className={styles['body'] + ' ' + 'toFind'} style={{background: props.color}} data-id={props.card.id} ref={drag}>{props.card.name}</div>
    );
}
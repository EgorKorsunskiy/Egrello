import { observer } from 'mobx-react-lite';
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
        <div className={styles['body'] + ' ' + 'toFindCards'} style={{background: props.color}} data-id={props.card.id} ref={drag}>
            {props.card.name}
        </div>
    );
}
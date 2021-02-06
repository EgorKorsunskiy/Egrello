import { useRef } from 'react';
import { useHistory } from 'react-router-dom';
import  styles  from './index.module.css';

export const BoardView = (props) => {

    const history = useHistory();
    const isToDelete = useRef(false);

    const clickHandler = () => {
        if(isToDelete.current){
            history.replace('');
            props.boardState.deleteBoard(props.board.id);
        }
        else{
            props.boardState.currentColor = props.board.color;
            history.push(`/board/${props.board.id}`);
        }
    }

    const deleteClickHandler = () => {
        history.push(`/board/${props.board.id}`);
        props.boardState.currentColor = props.board.color;
        isToDelete.current = true;
    }

    return (
        <div className={styles['body']} style={{background: props.board.color}} onClick={clickHandler}>
            <div className={styles['textContainer']}>
                <p className={styles['p']}>{props.board.title}</p>
            </div>
            <button className={styles['button']} onClick={deleteClickHandler}>&#x2715;</button>
        </div>
    )
}
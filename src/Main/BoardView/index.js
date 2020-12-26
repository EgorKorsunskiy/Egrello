import { Link } from 'react-router-dom';
import  styles  from './index.module.css';

export const BoardView = (props) => {
    const clickHandler = () => {
        props.updateColor(props.board.color)
    }

    return (
        <Link to={`/board/${props.board.id}`} style={{textDecoration: 'none'}}>
            <div className={styles['body']} style={{background: props.board.color}} onClick={clickHandler}>
                <p className={styles['p']}>{props.board.title}</p>
                <Link to=''>
                    <button className={styles['button']} onClick={() => props.boardState.deleteBoard(props.board.id)}>&#x2715;</button>
                </Link>
            </div>
        </Link>
    )
}
import { Link } from 'react-router-dom';
import './index.css';

export const BoardView = (props) => {

    const clickHandler = () => {
        props.updateColor(props.color)
    }

    return (
        <Link to={`/board/${props.id}`} style={{textDecoration: 'none'}}>
            <div className='board_view-body' style={{background: props.color}} onClick={clickHandler}>
                <p>{props.title}</p>
            </div>
        </Link>
    )
}
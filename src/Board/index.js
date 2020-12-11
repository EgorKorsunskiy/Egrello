import { useParams } from 'react-router-dom';
import './index.css';

export const Board = (props) => {
    
    const {id} = useParams();
    const color = props.boardState.boards.filter(el => el.id == id);
    console.log(color)

    return (
        <div className='board-body'>123</div>
    )
}
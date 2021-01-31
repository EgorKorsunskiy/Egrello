import { useEffect } from 'react';
import { BoardView } from '../BoardView';
import styles from './index.module.css';

export const FilteredBoards = (props) => {

    useEffect(() => () => {
        props.setIsSearching(false);
    },[])

    const drawBoardViews = () => {
        const Elements = [];
        const filteredBoards = props.boardState.boards.filter(board => board.title.includes(props.searchText));

        filteredBoards.forEach((board, index) => {
            Elements.push(
                <BoardView 
                    boardState={props.boardState}
                    board={board}
                    key={index}
                />
            )
        })

        return Elements;
    }

    return(
        <div className={styles['boards_list']}>
            {drawBoardViews()}
        </div>
    );
}
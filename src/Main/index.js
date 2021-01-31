import { Modal } from '@material-ui/core';
import { useState } from 'react';
import { BoardView } from './BoardView';
import { ColorPickerItem } from './ColorPickerItem';
import styles from './index.module.css';

const MAX_SYMBOLS = 30;

export const MainPage = (props) => {

    const [isOpen, setIsopen] = useState(false);
    const [color, setColor] = useState(props.boardState.currentColor);
    const [title, setTitle] = useState('')

    const toggleModalWindow = () => {
        setIsopen(!isOpen);
    }

    const drawBoardViews = () => {
        const Elements = [];

        props.boardState.boards.forEach((board, index) => {
            Elements.push(
                <BoardView 
                    boardState={props.boardState}
                    board={board}
                    updateColor={props.updateColor}
                    key={index}
                />
            )
        })

        return Elements;
    }

    const drawColorPickerItems = () => {
        const Elements = [];

        props.boardState.availableColors.forEach((color, index) => {
            Elements.push(
                <ColorPickerItem 
                    color={color}
                    setColor={setColor}
                    key={index}
                />
            )
        })

        return Elements;
    }

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const createBoard = () => {
        if(title.length > MAX_SYMBOLS){
            alert('Your title is too long!');
            return;
        }
        props.boardState.addBoard(title, color)

        toggleModalWindow();
    }

    const computeColorPickerItemsHeight = () => {
        let NumberOfColorPickerItems = props.boardState.availableColors.length;

        if(NumberOfColorPickerItems % 3 === 0){
            return NumberOfColorPickerItems / 3;
        }
        return Math.floor(NumberOfColorPickerItems / 3) + 1;
    }

    return (
        <div className={styles['main-body']}>
            <p className={styles['label-p']}>Ваши доски</p>
            <div className={styles['boards_list']}>
                {drawBoardViews()}
                <div className={styles['create_border']}>
                    <button onClick={ toggleModalWindow } className={styles['create-button']}>Создать</button>
                </div>
            </div>
            <Modal 
                open={isOpen}
            >
                <div className={styles['modal-body']}>
                    <div className={styles['create-container']}>
                        <div className={styles['create-input-container']} style={{background: color}}>
                            <input type='text' 
                            className={styles['create-input']}
                            onInput={updateTitle}
                            placeholder='Введите название доски'
                            style={{background: color}}
                            />
                             <button className={styles['close-button']} onClick={toggleModalWindow}>&#10005;</button>
                        </div>
                        {
                            title?
                            (
                                <button className={styles['modal-create-button']} onClick={createBoard}>Создать доску</button>
                            ):
                            <button className={styles['modal-create-button_disable']}>Создать доску</button>
                        }
                    </div>
                    <div className={styles['color_picker-container']} style={{maxHeight: computeColorPickerItemsHeight() + 'px'}}>
                        {drawColorPickerItems()}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
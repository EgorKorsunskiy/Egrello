import { Modal } from '@material-ui/core';
import { useState } from 'react';
import { BoardView } from './BoardView';
import { ColorPickerItem } from './ColorPickerItem';
import './index.css';

const MAX_SYMBOLS = 30;

export const MainPage = (props) => {

    let id = props.boardState.boards.length?props.boardState.boards.length + 1:0;

    const [isOpen, setIsopen] = useState(false);
    const [color, setColor] = useState('rgb(176, 70, 50)');
    const [title, setTitle] = useState('')
    const [isCreateInputActive, setIsCreateInputActive] = useState(false);

    const toggleModalWindow = () => {
        setIsopen(!isOpen);
    }

    const drawBoardViews = () => {
        const Elements = [];
        let index = 0;

        for(let el of props.boardState.boards){
            Elements.push(
                <BoardView 
                    id={el.id}
                    title={el.title}
                    color={el.color}
                    updateColor={props.updateColor}
                    key={index}
                />
            )
            index++;
        }

        return Elements;
    }

    const drawColorPickerItems = () => {
        const Elements = [];
        let index = 0;
        for(let el of props.boardState.availableColors){
            Elements.push(
                <ColorPickerItem 
                    color={el}
                    setColor={setColor}
                    key={index}
                />
            )
            index++;
        }

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
        props.boardState.addBoard({
            id,
            title,
            color,
            tables:[]
        })
        id++;

        toggleModalWindow();
    }

    const computeColorPickerItemsHeight = () => {
        let NumberOfColorPickerItems = drawColorPickerItems().length;

        if(NumberOfColorPickerItems % 3 === 0){
            return NumberOfColorPickerItems / 3;
        }
        for(;NumberOfColorPickerItems >= 0;NumberOfColorPickerItems--){
            if(NumberOfColorPickerItems % 3 === 0){
                return (NumberOfColorPickerItems % 3) + 1
            }
        }
    }

    return (
        <div className='main-body'>
            <p className='label-p'>Ваши доски</p>
            <div className='boards_list'>
                {drawBoardViews()}
                <div className='create_border'>
                    <button onClick={ toggleModalWindow } className='create-button'>Создать</button>
                </div>
            </div>
            <Modal 
                open={isOpen}
            >
                <div className='modal-body'>
                    <div className='create-container'>
                        <div className='create-input-container' style={{background: color}}>
                            <input type='text' 
                            className={isCreateInputActive?
                            'create-input active-input':
                            'create-input'}
                            onInput={updateTitle}
                            placeholder='Введите название доски'
                            style={{background: color}}
                            onFocus={() => setIsCreateInputActive(true)}
                            onBlur={() => setIsCreateInputActive(false)}/>
                             <button className='close-button' onClick={toggleModalWindow}>&#10005;</button>
                        </div>
                        {
                            title?
                            (
                                <button className='create-button' onClick={createBoard}>Создать доску</button>
                            ):
                            <button className='create-button_disable'>Создать доску</button>
                        }
                    </div>
                    <div className='color_picker-container' style={{maxHeight: computeColorPickerItemsHeight() + 'px'}}>
                        {drawColorPickerItems()}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
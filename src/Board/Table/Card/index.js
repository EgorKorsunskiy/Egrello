import { Modal } from '@material-ui/core';
import { useState } from 'react';
import { useDrag } from 'react-dnd';
import styles from './index.module.css';

export const Card = (props) => {

    const [isOpen,setIsOpen] = useState(false);
    const [isTitleEditing,setIsTitleEditing] = useState(false);
    const [titleText,setTitleText] = useState('');
    const [isDescriptionEditing,setIsDescriptionEditing] = useState(true);
    const [descriptionText,setDescriptionText] = useState('');

    const [, drag] = useDrag({
        item: {
        type: 'card',
        TableId: props.table.id,
        CardId: props.card.id
    }
    })

    const titleClickHandler = () => {
        setIsTitleEditing(!isTitleEditing);
        if(!isTitleEditing && titleText){
            props.card.name = titleText;
            setTitleText('');
        }
    }

    const descriptionClickHandler = () => {
        setIsDescriptionEditing(!isDescriptionEditing);
        if(!isDescriptionEditing && descriptionText){
            props.card.description = descriptionText;
            setDescriptionText('');
        }
    }    

    return(
        <div>
            <div className={styles['body'] + ' ' + 'toFindCards'} style={{background: props.color}} onClick={() => setIsOpen(true)} data-id={props.card.id} ref={drag}>
                {props.card.name}
                <button className={styles['button']} onClick={() => props.table.deleteCard(props.card.id)}>&#x2715;</button>
            </div>
            <Modal
                open={isOpen}
            >
                <div className={styles['modal-body']}>
                    <div className={styles['wrapper']}>
                        <div className={styles['formContainer']}>
                            <div className={styles['titleContainer']}>
                                <p className={styles['text']}>
                                    Title: 
                                    {
                                        isTitleEditing?
                                        <input className={styles['input']} onInput={(e) => setTitleText(e.target.value)}/>:
                                        props.card.name 
                                    }
                                    <button className={styles['button']}
                                        style={{color:'#000',fontSize:'18px',textAlign:'center',marginLeft:'5%'}} 
                                        onClick={titleClickHandler}>
                                        {
                                            isTitleEditing?
                                            'Apply':
                                            'Edit'
                                        }
                                        </button>
                                </p>
                            </div>
                            <div className={styles['descriptionContainer']}>
                                <p className={styles['text']}>
                                    Description: 
                                    {
                                        isDescriptionEditing?
                                        '':
                                        props.card.name 
                                    }
                                    <button className={styles['button']}
                                        style={{color:'#000',fontSize:'18px',textAlign:'center',marginLeft:'5%'}} 
                                        onClick={descriptionClickHandler}>
                                        {
                                            isDescriptionEditing?
                                            'Apply':
                                            'Edit'
                                        }
                                        </button>
                                </p>
                                {
                                    isDescriptionEditing?
                                    <textarea className={styles['input']} style={{marginLeft:'15%',minHeight:'200px'}} onInput={(e) => setDescriptionText(e.target.value)}/>:
                                    ''
                                }
                            </div>
                        </div>
                        <button className={styles['button']} style={{color:'#000',display:'flex',alignItems:'flex-start',fontSize:'16px',margin:'7px'}} onClick={() => setIsOpen(false)}>&#x2715;</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
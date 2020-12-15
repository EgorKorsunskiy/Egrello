import styles from './index.module.css';

export const ColorPickerItem = (props) => {

    return (
        <div className={styles.item} style={{background: props.color}} onClick={() => props.setColor(props.color)}></div>
    );
}
import './index.css';

export const ColorPickerItem = (props) => {

    return (
        <div className='color_picker-item' style={{background: props.color}} onClick={() => props.setColor(props.color)}></div>
    );
}
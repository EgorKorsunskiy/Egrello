import React from 'react';

const CHILD_WIDTH = 15;

export class Draggable extends React.Component {

    mouseDownHandler = e => {
        document.body.style.userSelect = 'none';
        window.addEventListener('mousemove', this.mouseMoveHandler);
        window.addEventListener('mouseup', this.mouseUpHandler);
    }

    mouseUpHandler = () => {
        document.body.style.userSelect = 'auto';
        window.removeEventListener('mousemove', this.mouseMoveHandler);
        window.removeEventListener('mouseup', this.mouseUpHandler);
    }

    mouseMoveHandler = e => {
        this.props.setX(e.clientX);
        this.props.setY(e.clientY);
    }

    componentWillUnmount() {
        document.body.style.userSelect = 'auto';
        window.removeEventListener('mousemove', this.mouseMoveHandler);
        window.removeEventListener('mouseup', this.mouseUpHandler);
    }

    render() {
        return (
            React.Children.only(React.cloneElement(
                this.props.children,
                {
                    onMouseDown: this.mouseDownHandler
                }
              ))
        )
    }
}
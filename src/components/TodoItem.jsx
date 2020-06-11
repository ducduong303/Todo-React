import React, { Component } from 'react';
import '../components/TodoItem.css';

import checkImg from '../img/check.svg';
import checkImgDone from '../img/check-done.svg';
import close from '../img/close.svg';
class TodoItem extends Component {

    render() {

        const { item, onClick } = this.props;
        let className = "TodoItem";
        let url = checkImg
        if (item.isComplete) {
            className += ' TodoItem-Complete';
            url = checkImgDone;
        }
        return (
            <div className={className}>
                <img
                    onClick={onClick}
                    src={url}
                    className="Todo-img"
                    alt="****" />
                <p>{item.title}</p>
                <img
                    src={close}
                    alt="***"
                    className="Todo-close"
                    onClick={this.props.onClickDelete}></img>
            </div>
        );
    }
}

export default TodoItem;
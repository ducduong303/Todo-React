import React, { Component } from 'react';
import TodoItem from './components/TodoItem';
import "../src/App.css";
import tick from '../src/img/tick.svg';
import { v4 as uuidv4 } from 'uuid';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: '',
            dataTodo: [
                { id: uuidv4(), title: "Xin chào", isComplete: false },
                { id: uuidv4(), title: "Say Hello", isComplete: false },
                { id: uuidv4(), title: "GoodBye", isComplete: false },
            ]
        }
        this.onChangeValue = this.onChangeValue.bind(this)
        this.onSubmitValue = this.onSubmitValue.bind(this)
        this.FilterActive = this.FilterActive.bind(this)
        this.FilterAll = this.FilterAll.bind(this)
    }
    /** Click Thây đổi Trạng Thái */
    onClickItem(item) {
        const isComplete = item.isComplete;
        const { dataTodo } = this.state;
        const index = dataTodo.indexOf(item)
        this.setState({
            dataTodo: [
                ...dataTodo.slice(0, index),
                {
                    ...item,
                    isComplete: !isComplete
                },
                ...dataTodo.slice(index + 1)
            ]
        })
    }
    /** CHức Năng Add */
    onChangeValue(event) {
        const text = event.target.value
        this.setState({
            newItem: text
        })
    }
    onSubmitValue(event) {
        const { dataTodo } = this.state
        event.preventDefault();
        this.setState(({
            newItem: '',
            dataTodo: [
                { id: uuidv4(), title: this.state.newItem, isComplete: false },
                ...dataTodo
            ]
        }))

    }
    /** Xóa */
    onClickDelete(item) {
        const { dataTodo } = this.state;
        const index = dataTodo.findIndex(x => x.id === item.id)
        if (index < 0) return;
        const newTodo = [...dataTodo]
        newTodo.splice(index, 1)
        this.setState({
            dataTodo: newTodo
        })
    }
    FilterActive() {
        const { dataTodo } = this.state
        const newDataTodo = [...dataTodo]
        const Mang = newDataTodo.filter(Myfilter)
        
        function Myfilter(item) {
            return item.isComplete === false
        }
        this.setState({
            dataTodo: [
                ...Mang
            ]
        
        })

    }
    FilterAll() {
        const { dataTodo } = this.state
        const newDataTodo = [...dataTodo]
        const Mang = newDataTodo.filter(Myfilter)
        
        function Myfilter(item) {
            return item.isComplete === true
        }
        this.setState({
            dataTodo: [
                ...Mang
            ]
        
        })
      
    }
    render() {
        return (
            <div>
                <div className="App-title"><h1>TODO-List</h1></div>
                <div className="App">
                    <div className="header">
                        <img src={tick} className="header-img" alt="****" />
                        <form onSubmit={this.onSubmitValue}>
                            <input
                                type="text"
                                placeholder="Add item"
                                value={this.state.newItem}
                                onChange={this.onChangeValue}
                            ></input>
                        </form>
                    </div>
                    {this.state.dataTodo.map((item, index) =>
                        <TodoItem
                            item={item}
                            key={index}
                            onClick={() => this.onClickItem(item)}
                            onClickDelete={() => this.onClickDelete(item)}
                        />
                    )}
                    <div className="Footer">
                        <p>Số Item: {this.state.dataTodo.length}</p>
                        <p onClick={this.FilterActive}>Active</p>
                        <p onClick={this.FilterAll}>ALL</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
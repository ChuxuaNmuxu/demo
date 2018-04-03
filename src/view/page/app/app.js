import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import {connect} from 'react-redux';
import styles from './app.scss';
import {addTodo} from 'src/action';
console.log('styles: ', styles);

class App extends Component {
    constructor (props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }
    componentWillMount () {
        console.log('root 生命周期 willMount 触发了！');
    }
    componentDidMount () {
        console.log('root 生命周期 didMount 触发了！');
    }
    _handleClick () {
        alert('yf超帅的！');
    }

    handleAddTodo () {
        const {addTodo} = this.props;
        addTodo({
            text: 'another todo',
            completed: false
        })
    }

    render () {
        const {todos} = this.props;
        return (
            <div className='app' styleName='app'>
                cool ! !!!!!
                <div className="container" onClick={this._handleClick}>
                    App demo !
                </div>
                <div onClick={this.handleAddTodo}>
                    {
                        todos.map(({text, completed, index}) => <div key={`${text}-${index}`} >
                            <span>{text}</span>
                            <span>&nbsp;&nbsp;</span>
                            <span>{completed ? 'done' : 'todo'}</span>
                        </div>
                        )
                    }
                </div>
            </div>
        );
    }
}

// App.propTypes = {

// };

const mapStateToState = state => {
    const {todos} = state;
    return {
        todos
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addTodo: data => dispatch(addTodo(data))
    }
}

export default connect(mapStateToState, mapDispatchToProps)(CSSModules(App, styles));

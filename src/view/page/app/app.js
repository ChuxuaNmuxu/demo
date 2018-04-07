import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import {connect} from 'react-redux';
import styles from './app.scss';
import {addTodo} from 'src/action';
import fetch from '../../../../core/fetch';

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            data: 'right !'
        }

        this._handleClick = this._handleClick.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }
    componentWillMount () {
        console.log('root 生命周期 willMount 触发了！');
    }
    async componentDidMount() {
        try {
            const response = await fetch('/api/test');
            console.log('response: ', response)
            const data = await response.text();
            this.setState({ data });
        } catch (err) {
            this.setState({ data: 'Error ' + err.message });
        }
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
                {this.state.data}
                <div className='container' onClick={this._handleClick}>
                    App demo  
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

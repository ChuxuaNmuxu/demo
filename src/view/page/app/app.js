import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import {connect} from 'react-redux';
import styles from './app.scss';
import {addTodo} from 'src/action';
// import fetch from '../../../../core/fetch';
import { isString } from 'util';

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            data: {
                message: 'right'
            }
        }

        this._handleClick = this._handleClick.bind(this);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }
    componentWillMount () {
        console.log('root 生命周期 willMount 触发了！');
    }
    async componentDidMount() {
        // try {
        //     console.log('fetch: ', fetch)
        //     const response = await fetch('/api/test');
        //     const data = await response.text();
        //     console.log('response: ', typeof data)
        //     this.setState({ 
        //         data: isString(data) ? JSON.parse(data) : data
        //     });
        // } catch (err) {
        //     this.setState({ data: 'Error ' + err.message });
        // }

        try {
            console.log('fetch: ', fetch)
            const response = await fetch('/api/test');
            const response2 = await fetch('/api/addtest', {method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({song: 'my love'})});
            const data = await response.text();
            console.log('response: ', typeof data)
            console.log(888,data)
            this.setState({ 
                data: isString(data) ? JSON.parse(data) : data
            });
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
                {this.state.data.message}
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
    const {todos = []} = state;
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

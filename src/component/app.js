import React, {Component} from 'react';
// import PropTypes from 'prop-types';

class App extends Component {
    constructor (props) {
        super(props);
        this._handleClick = this._handleClick.bind(this);
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
    render() {
        return (
            <div>
                <h1>Hello World!</h1>
                <button onClick={this._handleClick}>Click Me</button>
            </div>);
    }
}

// App.propTypes = {

// };

export default App;

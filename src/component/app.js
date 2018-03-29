import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules'
import styles from './app.scss';
console.log('styles: ', styles)

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
            <div className='app' styleName='app'>
                cool ! 
                <div className="container">
                    App demo !
                </div>
            </div>
        );
    }
}

// App.propTypes = {

// };

export default CSSModules(App, styles);

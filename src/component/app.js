import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules'
import styles from './app.scss';
console.log('styles: ', styles)

class App extends Component {
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
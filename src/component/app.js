import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules'
import styles from './app.scss'

@CSSModules(styles)
class App extends Component {
    render() {
        const {a, ...rest} = {a: 1, b: 2}

        return (
            <div styleName='app'>
                App demo !
            </div>
        );
    }
}

// App.propTypes = {

// };

export default App;
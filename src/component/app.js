import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './app.css';
import Child from './child';

class App extends Component {
    render() {
        const {a} = this.props;
        console.log(a)
        return (
            <div className='app'>
                App demo !!!dfasf
                <Child />
            </div>
        );
    }
}

// App.propTypes = {

// };

export default App;
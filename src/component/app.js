import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board from './Board';

class App extends Component {
    render() {
        return (
            <Board knightPosition={[3, 6]} />
        );
    }
}

// App.propTypes = {

// };

export default App;
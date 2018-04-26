import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import List from './List';

@DragDropContext(HTML5Backend)
class App extends Component {
    render() {
        return (
            <div>
                <List />
            </div>
        );
    }
}

App.propTypes = {

};

export default App;
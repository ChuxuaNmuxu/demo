import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './app.css'

class App extends Component {
    render() {
        return (
            <div className='container' >
                <div className="demo">
                    demo
                </div>

                <div className="children1">
                    children1
                </div>

                <div className="children2">
                    children2
                </div>
            </div>
        );
    }
}

// App.propTypes = {

// };

export default App;
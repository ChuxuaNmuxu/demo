import React, { Component } from 'react';
import PropTypes from 'prop-types';
import image from './timg.jpg'

import Shape from './Buttons/Shape'
import ImageEditor from './ImageEditor'
const id = 'image-eiditor-canvas'

class App extends Component {
    render() {
        return (
            <React.Fragment>
                <ImageEditor
                    id={id}
                    image={image}
                    width={800}
                    height={800}
                    position={{x: 50, y: 50}}
                />
                <Shape canvasId={id}/>
            </React.Fragment>
        );
    }
}

// App.propTypes = {

// };

export default App;
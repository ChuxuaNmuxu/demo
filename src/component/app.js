import React, { Component } from 'react';
import PropTypes from 'prop-types';
import image from './timg.jpg'

import Shape from './Buttons/Shape'
import Text from './Buttons/Text'
import Arrow from './Buttons/Arrow'
import FreeDraw from './Buttons/FreeDraw'
import Undo from './Buttons/Undo'
import Save from './Buttons/Save'
import ImageEditor from './ImageEditor'
const id = 'image-eiditor-canvas'

class App extends Component {
    handleSave = () => {
        const canvas = document.querySelector(`#${id}`);

        const dataUrl = canvas.toDataURL();

        console.log(19, dataUrl)

        const img = document.createElement('img');
        img.src = dataUrl;

        img.onload = () => {
            document.querySelector('#copy').appendChild(img)
        }
    }

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
                <Shape canvasId={id} />
                <Text canvasId={id} />
                <Arrow canvasId={id} />
                <FreeDraw canvasId={id} />
                <Undo canvasId={id} />
                <Save canvasId={id} />
                <div id='copy'></div>
            </React.Fragment>
        );
    }
}

// App.propTypes = {

// };

export default App;
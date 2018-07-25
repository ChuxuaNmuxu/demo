import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';

import editorManager from './helper/editorManager'

class ImageEditor extends Component {
    static propTypes = {
        image: PropTypes.string,
        position:PropTypes.object,
        width: PropTypes.number,
        height: PropTypes.number,
        id: PropTypes.string
    };

    static defaultProps = {
        id: `image-editor-canvas-${uuid.v4()}`,
        width: 200,
        height: 200,
        position: {x: 0, y: 0}
    }

    componentDidMount() {
        const {image, position, id} = this.props;
        console.log(25, id);
        // TODO: init fabric
        const editor = editorManager.registryGraphics(id, {
            image,
            position
        });
    }
    

    render() {
        const {width, height, id} = this.props;
        return (
            <canvas id={id} width={width} height={height} />
        );
    }
}

export default ImageEditor;
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import editorManager from '../helper/editorManager';
import consts from '../helper/consts';
import invariant from 'invariant';
import _ from 'lodash';

const {drawingModes} = consts; 

export default (options) => DecoratedComponent => {
    const {
        canvasId,
        options: modeOptions
    } = options;

    const mode = options.mode ? options.mode.toUpperCase() : drawingModes.NORMAL;
    
    console.log('draw', _.values(drawingModes))

    invariant(
        _.includes(_.values(drawingModes), mode),
        '%s is not support',
        mode
    )

    class Bar extends Component {
        static displayName = `graphics-shape-${DecoratedComponent.displayName || 'component'}`;

        static propTypes = {
            canvasId: PropTypes.string
        }

        get canvasId () {
            return this.props.canvasId || canvasId
        }

        get graphics () {
            invariant(
                this.canvasId,
                'canvasId is supposed to be passed'
            )

            const graphics = editorManager.getGraphics(this.canvasId);
            return graphics;
        }

        handleStart = () => {
            this.graphics.startDrawingMode(mode, modeOptions);

            const {handleStart} = this.props;
            handleStart && handleStart();
        }

        render() {
            const state = {
                handleStart: this.handleStart,
                graphics: this.graphics
            }
            return (
                <DecoratedComponent 
                  {...this.props}
                  {...state}
                />
            )
        }
    }

    return hoistNonReactStatics(Bar, DecoratedComponent)
}
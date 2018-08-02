import React, { Component } from 'react'
import PropTypes from 'prop-types'
import editorManager from '../ImageEditor/helper/editorManager';


export default class Shape extends Component {
    static propTypes = {
        handleStart: PropTypes.func
    }

    handleStart = () => {
        const {canvasId} = this.props;
        const canvas = editorManager.save(canvasId);
        console.log(canvas)
    }

    render() {
        return (
            <botton onClick={this.handleStart}> save </botton>
        )
    }
}

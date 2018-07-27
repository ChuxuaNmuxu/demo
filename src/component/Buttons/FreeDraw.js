import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {graphicsToolBar} from '../ImageEditor';

@graphicsToolBar({
    mode: 'freeDraw'
})
export default class Shape extends Component {
    static propTypes = {
        prop: PropTypes
    }

    handleStart = () => {
        const {handleStart} = this.props;
        handleStart && handleStart()
    }

    render() {
        return (
            <bottom onClick={this.handleStart}>Free style </bottom>
        )
    }
}

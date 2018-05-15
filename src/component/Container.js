import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Wrap from './Wrap'
import CSSModules from 'react-css-modules'
import styles from './Container.scss'
console.log(222, styles)

class Container extends Component {
    componentWillReceiveProps (nextProps) {
        console.log(123, nextProps)
        console.log(124, this.props)
    }

    render() {
        console.log('container render', this.props)

        return (
            <div styleName='container'>
                <Wrap />
            </div>
        )
    }
}

export default CSSModules(Container, styles);

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Content from './Content'
import CSSModules from 'react-css-modules'
import styles from './Container.css'
console.log(222, styles)

class Container extends Component {
    render() {
        console.log('container render')

        return (
            <div styleName='container'>
                <Content />
            </div>
        )
    }
}

export default CSSModules(Container, styles);

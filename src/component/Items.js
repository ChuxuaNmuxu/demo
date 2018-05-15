import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import styles from './Items.scss'

class Items extends Component {
    static propTypes = {
        count: PropTypes.number
    }

    render() {
        return (
            <div styleName='item'>
                {this.props.count}
            </div>
        );
    }
}

export default CSSModules(Items, styles);
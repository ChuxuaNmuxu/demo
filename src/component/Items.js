import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import CSSModules from 'react-css-modules';
// import styles from './Items.scss'

class Items extends Component {
    static propTypes = {
        count: PropTypes.number
    }

    render() {
        return (
            <div>
                {this.props.count || 6}
                {this.props.children}
            </div>
        );
    }
}

// export default CSSModules(Items, styles);
export default Items;
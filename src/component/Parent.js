import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Parent extends Component {
    render() {
        return (
            <div onTouchStart={e => e.preventDefault()}>
                parent
                {this.props.children}
            </div>
        );
    }
}

Parent.propTypes = {

};

export default Parent;
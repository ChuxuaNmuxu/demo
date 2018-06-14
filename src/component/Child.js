import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Child extends Component {
    render() {
        return (
            <div onClick={() => console.log(898989)} >
                child
            </div>
        );
    }
}

Child.propTypes = {

};

export default Child;
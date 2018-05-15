import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from './Content'
import {Link} from 'react-router-dom'

class Wrap extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            count: 0
        }
    }

    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        console.log('wrap render')
        return (
            <div  onClick={this.handleClick} >
                <Content count={this.state.count}/>
                <Link to="/about">About</Link>
            </div>
        );
    }
}

export default Wrap;
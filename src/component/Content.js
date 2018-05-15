import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Content extends Component {
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
        console.log('content render')

        return (
            <div onClick={this.handleClick} >
                {
                    this.state.count
                }
            </div>
        )
    }
}

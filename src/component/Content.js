import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './Items';

export default class Content extends Component {
    // handleClick = () => {
    //     this.setState({
    //         count: this.state.count + 1
    //     })
    // }

    render() {
        console.log('content render')
        const renderItem = () => <Item count={this.props.count} />     

        return renderItem()
    }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './test.css'
import Items from './Items';

export default class Test extends Component {
  static propTypes = {
    prop: PropTypes
  }

  render() {
    const Child = React.cloneElement(<Items />, {count: 12})
    const Co = React.cloneElement(<Items />, {a: 12}, [<div>333</div>, Child])
    console.log(Co)
    return Co
  }
}

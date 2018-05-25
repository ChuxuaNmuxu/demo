import React from 'react'
import PropTypes from 'prop-types'
import hoc from './hoc';

@hoc()
export default class Component extends React.Component {
    static propTypes = {
        prop: PropTypes
    }

    static displayName = 'Component-test'

    render() {
        return (
            <div>
                dddd
            </div>
        )
    }
}

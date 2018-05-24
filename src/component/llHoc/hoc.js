import React from 'react'


export default hoc = () => Component => {
    class DecoratedComponent extends Component {
        render () {
            const elementTree = super.render();
            elementTree.props.className = 'test-css'
            return elementTree
        }
    }
}
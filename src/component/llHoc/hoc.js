import React from 'react'
import objectUnfreeze from 'object-unfreeze';
import hoistStatics from 'hoist-non-react-statics'

const hoc = () => Component => {
    class DecoratedComponent extends Component {
        render () {
            let elementTree = super.render();
            elementTree = objectUnfreeze(elementTree);
            elementTree.props = objectUnfreeze(elementTree.props);
            elementTree.props.className = 'test-css'
            Object.preventExtensions(elementTree.props);
            console.log(elementTree)
            return elementTree
        }
    }

    // return hoistStatics(DecoratedComponent, Component);
    return DecoratedComponent
}

export default hoc;
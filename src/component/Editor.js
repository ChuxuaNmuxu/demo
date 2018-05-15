import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';
import {isEqual} from 'lodash'

import styles from './Editor.scss';
import Viewport from './Viewport';


class Editor extends React.Component {

    componentWillReceiveProps (nextProps) {
        console.log('nextProps: ', nextProps);
        console.log('this.props: ', this.props);
        console.log('nextprops === this.props: ', this.props === nextProps)
        console.log('nextprops === this.props: ', isEqual(this.props, nextProps))
    }

    render () {
        console.log('eidtor props: ', this.props)

        // const {current, blockIds, blockObjects} = this.props;
        // const currentBlockIds = current.get('blocks')
        // const currentBlocks = blockObjects.filter(block => currentBlockIds.includes(block.get('id'))).toList();

        return (
                <div className='editor' styleName='editor'>
                    <Viewport  />
                </div>
        )
    }
}


// export default Editor;
export default CSSModules(Editor, styles);

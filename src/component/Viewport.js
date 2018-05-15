import React from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules';

export class Component extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            count: 0
        }
    }
    
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log('viewport setState')
        })
    }
    render () {
        console.log('viewport render')

        const {blockIds, currentBlocks, objects} = this.props;
        return (
            // <div className='viewport' styleName='viewport' onClick={this.handleClick} >
            //     <div className='reveal'>
            //         <div className='slides'>
            //             <section className='section'>
            //                 {/* <CustomDragLayer /> */}
            //                 {
            //                     blockIds.map(id =>
            //                         <Block
            //                           count={this.state.count}
            //                           key={id}
            //                           block={objects.get(id)}
            //                           active={currentBlocks.includes(id)}
            //                         />
            //                     )
            //                 }
            //             </section>
            //         </div>
            //     </div>
            // </div>
            <div style={{height: '1000px'}} onClick={this.handleClick} ></div>
        )
    }
}

// export default connect(mapStateToProps)(CSSModules(Component, styles));
// export default connect(mapStateToProps)(Component)
export default Component

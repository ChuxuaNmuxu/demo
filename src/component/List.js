import React, { Component } from 'react';

import {list} from './data';
import Item from './Item';
import './List.css';

class App extends Component {
    render() {
        const {connectDragSource} = this.props;
        return (
            <div className='wrap'>
                {
                    list.map((item) => <Item item={item} key={item.id} />)
                }
            </div>
        );
    }
}

export default App;
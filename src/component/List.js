import React, { Component } from 'react';
import update from 'react-addons-update';

import {list} from './data';
import Item from './Item';
import './List.css';

class App extends Component {
    constructor (props) {
        super(props);

        this.state = {
            list
        }

        this.exchange = this.exchange.bind(this);
    }

    exchange (sourceId, targetId) {
        const {list} = this.state;
        const sourceIndex = list.findIndex(item => item.id === sourceId);
        const targetIndex = list.findIndex(item => item.id === targetId);
        const source = list[sourceIndex];

        this.setState({
            list: update(list, {
                $splice: [
                    [sourceIndex, 1],
                    [targetIndex, 0, source]
                ]
            })
        })
    }

    render() {
        const {connectDragSource} = this.props;
        const {list} = this.state;
        return (
            <div className='wrap'>
                {
                    list.map((item) => <Item exchange={this.exchange} item={item} key={item.id} />)
                }
            </div>
        );
    }
}

export default App;
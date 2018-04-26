import React, { Component } from 'react';
import {DragSource, DropTarget} from 'react-dnd';

const Types = {
    CARD: 'card'
}

const ListDragSource = {
    beginDrag (props, monitor, component) {
        return {
            id: props.item.id
        }
    },
    endDrag (props, monitor, component) {
        console.log('props: ', props)
        return {
            id: props.item.id
        }
    }
}

const dragCollect = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
})

const ListDropTarget = {
    drop(props, monitor, component) {
        console.log('drop(props): ', props)
    }
}

const dropCollect = (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
})

@DropTarget(Types.CARD, ListDropTarget, dropCollect)
@DragSource(Types.CARD, ListDragSource, dragCollect)
class Item extends Component {
    render() {
        const {item, connectDragSource, connectDropTarget, isOver} = this.props;
        const classes = `list ${isOver ? 'over' : ''}`
        return (
            connectDropTarget(connectDragSource(
                <div className={classes} >
                    <div className="title">
                        {item.title || 'title'}
                    </div>
                    <div className="content">
                        {item.content || 'content'}
                    </div>
                </div>
            )
        ));
    }
}

export default Item;
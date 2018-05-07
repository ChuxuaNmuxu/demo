import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './app.css';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            show: true
        }
    }
    

    handleDragStart = (e) => {
        console.log('dragstart');

        e.dataTransfer.setData('text/plain', e.target.id);

        var img = new Image()
        img.src = 'https://www.baidu.com/img/baidu_jgylogo3.gif';
        e.dataTransfer.setDragImage(this.node, 100, 1);
    }

    handleDrop (e) {
        e.preventDefault();
    }

    handleDrag = (e) => {
        console.log('draging: ')
        const _this = this;
        setTimeout(() => {
            this.setState({
                show: false
            })   
        }, 1000)
        
    }

    handleDragEnd = (e) => {
        console.log('drag END')
    }

    topDragStart (e) {
        console.log(1, this)
    }

    componentDidMount () {
        window.addEventListener('mousemove', this.topDragStart)
    }

    render() {
        return (
            <div className='wrap' ref={e => this.node = e}>
                {
                    this.state.show && (
                        <div className="source" draggable='true'
                        onDragStart={this.handleDragStart}
                        onDrag={this.handleDrag}
                        onDragEnd={this.handleDragEnd}
                        >
                            source, I am ready to be dragged !
                        </div>
                    )
                }
                <div className="target" onDragOver={this.handleDrop} >
                    App demo !
                </div>
            </div>
        );
    }
}

// App.propTypes = {

// };

export default App;
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './app.css';

class App extends Component {
    constructor(props, context) {
        super(props, context);
        
        this.state = {
            show: true,
            dragging: false,
        }
    }
    

    handleDragStart = (e) => {
        console.log('dragstart');

        // e.dataTransfer.setData('text/plain', e.target.id);

        // var img = new Image()
        // img.src = 'https://www.baidu.com/img/baidu_jgylogo3.gif';
        const emptyImage = new Image()
		emptyImage.src =
			'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=='
        e.dataTransfer.setDragImage(emptyImage, 100, 1);
    }

    handleDrop (e) {
        e.preventDefault();
    }

    handleDrag = (e) => {
        console.log('draging: ')
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
        // console.log(1, this)
    }

    componentDidMount () {
        window.addEventListener('mousemove', this.topDragStart)
    }

    handleGroundDragStart = (e) => {
        this.setState({
            dragging: true
        })
    }

    handleGroundDrag = () => {
        console.log('handleGroundDrag')
    }

    handleGroundDragEnd = () => {
        console.log('handleGroundDragEnd')
    }

    handleSuspensionDragStart = () => {
        console.log('handleSuspensionDragStart')
    }

    handleSuspensionDrag = () => {
        console.log('handleSuspensionDrag')
    }

    handleSuspensionDragEnd = () => {
        this.setState({
            dragging: false
        })
        console.log('handleSuspensionDragEnd')
    }

    render() {
        return (
            <div className='wrap' ref={e => this.node = e}>
                {/* <div className="source" draggable='true'
                    onDragStart={this.handleDragStart}
                    onDrag={this.handleDrag}
                    onDragEnd={this.handleDragEnd}
                >
                    source, I am ready to be dragged !
                </div>

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
                </div> */}

                <div
                  draggable='true'
                  onDrag={this.handleGroundDrag}
                  onDragEnd={this.handleGroundDragEnd}
                  className='ground'>
                    {this.state.dragging ? <div
                      draggable='true'
                      className='suspension'
                      onDragStart={this.handleSuspensionDragStart}
                      onDrag={this.handleSuspensionDrag}
                      onDragEnd={this.handleSuspensionDragEnd}
                    >悬浮层</div> : null}
                </div>

            </div>
        );
    }
}

// App.propTypes = {

// };

export default App;
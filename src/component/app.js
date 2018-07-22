import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CSSModules from 'react-css-modules'
import styles from './app.scss'
import {fabric} from 'fabric'

@CSSModules(styles)
class App extends Component {
    componentDidMount () {
        var canvas = new fabric.Canvas('canvas', {
            backgroundColor: '#ccc'
        });

        canvas.on('mouse:down', function(options) {
            console.log(33)
            console.log(options.e.clientX, options.e.clientY);
        });

        canvas.on('after:render', function(options) {
            console.log(334)
        });

        canvas.on('mouse:up', function(options) {
            if (options.target) {
              console.log('an object was clicked! ', options.target.type);
              canvas.isDrawingMode = false;
            }
        });

        console.log(canvas);

        var rect = new fabric.Rect({
            top : 100,
            left : 100,
            width : 60,
            height : 70,
            fill : 'red'
        });

        canvas.add(rect)

        rect.set('angle', 90).set('flipY', true)

        rect.hasBorders = false
        rect.hasControls = false;

        var path = new fabric.Path('M 0 0 L 200 100 L 170 200 z'); 
        path.set({left: 120, top: 120}); 
        path.set({ fill: 'red', stroke: 'green', opacity: 0.5 })
        canvas.add(path);

        rect.animate('left', '+=100', { onChange: canvas.renderAll.bind(canvas) });

        canvas.isDrawingMode = true
    }

    render() {
        const {a, ...rest} = {a: 1, b: 2}

        return (
            <div styleName='app'>
                <canvas id="canvas" width="1000" height="1000"></canvas>
            </div>
        );
    }
}

// App.propTypes = {

// };

export default App;
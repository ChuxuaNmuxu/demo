// fabric封装
import {fabric} from 'fabric';
import snippet from 'tui-code-snippet';
import _ from 'lodash';

import * as components from './components'
import consts from './consts';
import * as Components from './components';
import Image from './components/Image';
import util from './utils/util';
import ComponentStack from './ComponentStack';
import uuid from 'uuid'

const {extend, stamp, isArray, isString, forEachArray, forEachOwnProperties, CustomEvents} = snippet;
const drawingModes = consts.drawingModes;

const cssOnly = {
    cssOnly: true
};
const backstoreOnly = {
    backstoreOnly: true
};

const defaultCanvasOptions = {
    selection: false
}

class Graphics {
    _canvas;
    _drawingMode = drawingModes.NORMAL;
    drawingMode = drawingModes.NORMAL;
    _componentModules = {};

    constructor (elementId, options) {
        const {
            image,
            position = {x: 0, y: 0},
            canvasOptions
        } = options;

        this.initFabric(elementId, canvasOptions);
        this.registryComponentModule();
        this.componentStack = new ComponentStack();

        if (image) this.initImage(image)
        // 试验

    }

    isText (obj) {
        if (!obj) return false;
        return obj.type === 'text' || obj.type === 'i-text'
    }

    initImage (image, options) {
        const imageComponent = new Image(this);

        // imageComponent.load(image, options);
        imageComponent.setBackground(image)
        // 配置
    }

    initFabric (elementId, options) {
        this._canvas = new fabric.Canvas(elementId, Object.assign({}, defaultCanvasOptions, options));
        this._canvas.selection = false;
    }

    registryComponentModule () {
        for (let Component of _.values(Components)) {
            this.registry(this._componentModules, new Component(this));
        }
    }

    registry (collection, module) {
        collection[module.getName()] = module
    }

    /**
     * Start a drawing mode. If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
     * @param {String} mode Can be one of <I>'CROPPER', 'FREE_DRAWING', 'LINE', 'TEXT', 'SHAPE'</I>
     * @param {Object} [option] parameters of drawing mode, it's available with 'FREE_DRAWING', 'LINE_DRAWING'
     *  @param {Number} [option.width] brush width
     *  @param {String} [option.color] brush color
     * @returns {boolean} true if success or false
     */
    startDrawingMode (mode, option) {
        if (this.getDrawingMode() !== 'UNDO' && this._isSameDrawingMode(mode)) {
            return true;
        }

        // If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
        this.stopDrawingMode();

        const drawingComponentInstance = this.getComponent(mode);
        if (drawingComponentInstance && drawingComponentInstance.start) {
            drawingComponentInstance.start(option);

            this._drawingMode = mode;
        }

        return !!drawingComponentInstance;
    }

    /**
     * Stop the current drawing mode and back to the 'NORMAL' mode
     */
    stopDrawingMode() {
        if (this._isSameDrawingMode(drawingModes.NORMAL)) {
            return;
        }

        const drawingComponentInstance = this.getComponent(this.getDrawingMode());
        if (drawingComponentInstance && drawingComponentInstance.end) {
            drawingComponentInstance.end(this);
        }
        this._drawingMode = drawingModes.NORMAL;
    }

    /**
     * Get the current drawing mode is same with given mode
     * @param {string} mode drawing mode
     * @returns {boolean} true if same or false
     */
    _isSameDrawingMode(mode) {
        return this.getDrawingMode() === mode;
    }

    /**
     * Get current drawing mode
     * @returns {string}
     */
    getDrawingMode() {
        return this._drawingMode;
    }

    /**
     * Destroy canvas element
     */
    destroy() {
        const {wrapperEl} = this._canvas;

        this._canvas.clear();

        wrapperEl.parentNode.removeChild(wrapperEl);
    }

    /**
     * Deactivates all objects on canvas
     * @returns {Graphics} this
     */
    deactivateAll() {
        this._canvas.deactivateAll();

        return this;
    }

    /**
     * Renders all objects on canvas
     * @returns {Graphics} this
     */
    renderAll() {
        this._canvas.renderAll();

        return this;
    }

    /**
     * Get component
     * @param {string} name - Component name
     * @returns {Component}
     */
    getComponent(name) {
        return this._componentModules[name];
    }

    /**
     * Returns canvas element of fabric.Canvas[[lower-canvas]]
     * @returns {HTMLCanvasElement}
     */
    getCanvasElement() {
        return this._canvas.getElement();
    }

    /**
     * Get fabric.Canvas instance
     * @returns {fabric.Canvas}
     * @private
     */
    getCanvas() {
        return this._canvas;
    }

    /**
     * Get center position of canvas
     * @returns {Object} {left, top}
     */
    getCenter() {
        return this._canvas.getCenter();
    }

    /**
     * Set brush option
     * @param {Object} option brush option
     *  @param {Number} option.width width
     *  @param {String} option.color color like 'FFFFFF', 'rgba(0, 0, 0, 0.5)'
     */
    setBrush(option) {
        const drawingMode = this._drawingMode;
        let compName = components.FREE_DRAWING;

        if (drawingMode === drawingModes.LINE) {
            compName = drawingModes.LINE;
        }

        this.getComponent(compName).setBrush(option);
    }
}

CustomEvents.mixin(Graphics);
export default Graphics;

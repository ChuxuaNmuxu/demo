// fabric封装
import {fabric} from 'fabric';
import snippet from 'tui-code-snippet';
import _ from 'lodash';

import * as components from './components'
import * as contants from './consts';
import * as Components from './components';
import util from './utils/util'

const {extend, stamp, isArray, isString, forEachArray, forEachOwnProperties, CustomEvents} = snippet;
const drawingModes = contants.drawingModes;

class Graphics {
    _canvas;
    _drawingMode = drawingModes.NORMAL;
    drawingMode = contants.drawingModes.NORMAL;
    components = {};

    constructor (elementId, options) {
        const {
            image,
            position = {x: 0, y: 0}
        } = options;

        this.initFabric(elementId, options);
        this.registryComponent();

        if (image) this.addImageObject(image, position)
    }

    initFabric (elementId, options) {
        this._canvas = new fabric.Canvas(elementId);
    }

    registryComponent () {
        for (let Component of _.values(Components)) {
            this.registry(this.components, new Component(this));
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
        if (this._isSameDrawingMode(mode)) {
            return true;
        }

        // If the current mode is not 'NORMAL', 'stopDrawingMode()' will be called first.
        this.stopDrawingMode();

        const drawingComponentInstance = this._getComponentInstance(mode);
        if (drawingComponentInstance && drawingComponentInstance.start) {
            drawingComponentInstance.start(this, option);

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

        const drawingComponentInstance = this._getComponentInstance(this.getDrawingMode());
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
     * Get a DrawingMode instance
     * @param {string} modeName - DrawingMode Class Name
     * @returns {DrawingMode} DrawingMode instance
     * @private
     */
    _getComponentInstance(modeName) {
        return this.components[modeName];
    }

    /**
     * Add image object on canvas
     * @param {string} imgUrl - Image url to make object
     * @returns {Promise}
     */
    addImageObject (imgUrl, position) {
        fabric.Image.fromURL(imgUrl, image => {
            // callback(image);
            image.set({ left: position.x, top: position.y })
            this._canvas.setBackgroundImage(image, this._canvas.renderAll.bind(this._canvas));
        }, {
            crossOrigin: 'Anonymous'
        });
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
     * Return object's properties
     * @param {fabric.Object} obj - fabric object
     * @returns {Object} properties object
     */
    createObjectProperties(obj) {
        const predefinedKeys = [
            'left',
            'top',
            'width',
            'height',
            'fill',
            'stroke',
            'strokeWidth',
            'opacity'
        ];
        const props = {
            id: stamp(obj),
            type: obj.type
        };

        extend(props, util.getProperties(obj, predefinedKeys));

        if (['i-text', 'text'].indexOf(obj.type) > -1) {
            extend(props, this._createTextProperties(obj, props));
        }

        return props;
    }


    
    /**
     * Get text object's properties
     * @param {fabric.Object} obj - fabric text object
     * @param {Object} props - properties
     * @returns {Object} properties object
     */
    _createTextProperties(obj) {
        const predefinedKeys = [
            'text',
            'fontFamily',
            'fontSize',
            'fontStyle',
            'textAlign',
            'textDecoration'
        ];
        const props = {};
        extend(props, util.getProperties(obj, predefinedKeys));

        return props;
    }
}

CustomEvents.mixin(Graphics);
export default Graphics;

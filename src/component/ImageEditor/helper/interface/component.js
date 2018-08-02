/**
 * Component interface
 * @class
 * @param {string} name - component name
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
import _ from 'lodash';
const optionsFilter = ['mode', 'type', 'text']

export default class Component {
    constructor(name, graphics) {
        /**
         * Component name
         * @type {string}
         */
        this.name = name;

        /**
         * Graphics instance
         * @type {Graphics}
         */
        this.graphics = graphics;
    }

    /**
     * Fire Graphics event
     * @param {Array} args - arguments
     * @returns {Object} return value
     */
    fire(...args) {
        const context = this.graphics;

        return this.graphics.fire.apply(context, args);
    }

    /**
     * Save image(background) of canvas
     * @param {string} name - Name of image
     * @param {fabric.Image} oImage - Fabric image instance
     */
    setCanvasImage(name, oImage) {
        this.graphics.setCanvasImage(name, oImage);
    }

    /**
     * Returns canvas element of fabric.Canvas[[lower-canvas]]
     * @returns {HTMLCanvasElement}
     */
    getCanvasElement() {
        return this.graphics.getCanvasElement();
    }

    /**
     * Get fabric.Canvas instance
     * @returns {fabric.Canvas}
     */
    getCanvas() {
        return this.graphics.getCanvas();
    }

    /**
     * Get canvasImage (fabric.Image instance)
     * @returns {fabric.Image}
     */
    getCanvasImage() {
        return this.graphics.getCanvasImage();
    }

    /**
     * Get image name
     * @returns {string}
     */
    getImageName() {
        return this.graphics.getImageName();
    }

    /**
     * Get image editor
     * @returns {ImageEditor}
     */
    getEditor() {
        return this.graphics.getEditor();
    }

    /**
     * Return component name
     * @returns {string}
     */
    getName() {
        return this.name;
    }

    /**
     * Set image properties
     * @param {Object} setting - Image properties
     * @param {boolean} [withRendering] - If true, The changed image will be reflected in the canvas
     */
    setImageProperties(setting, withRendering) {
        this.graphics.setImageProperties(setting, withRendering);
    }

    /**
     * Set canvas dimension - css only
     * @param {Object} dimension - Canvas css dimension
     */
    setCanvasCssDimension(dimension) {
        this.graphics.setCanvasCssDimension(dimension);
    }

    /**
     * Set canvas dimension - css only
     * @param {Object} dimension - Canvas backstore dimension
     */
    setCanvasBackstoreDimension(dimension) {
        this.graphics.setCanvasBackstoreDimension(dimension);
    }

    /**
     * Adjust canvas dimension with scaling image
     */
    adjustCanvasDimension() {
        this.graphics.adjustCanvasDimension();
    }

    shouldDraw (obj) {
        // return !obj || !this.isText(obj)
        return true
    }

    getStack () {
        return this.graphics.componentStack
    }

    registry (component) {
        this.getStack().registryComponent(component);
        console.log(this.getStack().pastStack)
    }

    unRegistry () {
        this.getStack().stackPop;
    }

    createOptions (options) {
        this._options = _.merge({}, this._options, _.omit(options, ...optionsFilter));
    }

    beforeStart (options) {
        const canvas = this.getCanvas()
        this.createOptions(options);
        canvas.defaultCursor = 'crosshair';
    }

    finishDraw () {
        const canvas = this.getCanvas()
        canvas.forEachObject(obj => {
            if (this.graphics.isText(obj)) {
                canvas.bringToFront(obj);
            }
        });
    }
}

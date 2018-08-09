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
     * Get fabric.Canvas instance
     * @returns {fabric.Canvas}
     */
    getCanvas() {
        return this.graphics.getCanvas();
    }
    /**
     * Return component name
     * @returns {string}
     */
    getName() {
        return this.name;
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

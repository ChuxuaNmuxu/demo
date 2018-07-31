import {fabric} from 'fabric'
import Component from '../interface/component';
import consts from '../consts';
import resizeHelper from '../utils/shapeResizeHelper';
import _ from 'lodash'


const {eventNames} = consts;
const KEY_CODES = consts.keyCodes;

const DEFAULT_TYPE = 'circle';
const DEFAULT_OPTIONS = {
    strokeWidth: 1,
    stroke: '#000000',
    fill: '',
    width: 1,
    height: 1,
    rx: 0,
    ry: 0,
    lockSkewingX: true,
    lockSkewingY: true,
    lockUniScaling: false,
    bringForward: true,
    isRegular: false,
    lockMovementX: true,
    lockMovementY: true,
    hasBorders: false
};

const shapeType = ['rect', 'circle', 'triangle'];

/**
 * Shape
 * @class Shape
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
export default class Shape extends Component {
    constructor(graphics) {
        super(consts.componentNames.SHAPE, graphics);

        /**
         * Object of The drawing shape
         * @type {fabric.Object}
         * @private
         */
        this._shapeObj = null;

        /**
         * Type of the drawing shape
         * @type {string}
         * @private
         */
        this._type = DEFAULT_TYPE;

        /**
         * Options to draw the shape
         * @type {Object}
         * @private
         */
        this._options = _.merge({}, DEFAULT_OPTIONS);

        /**
         * Whether the shape object is selected or not
         * @type {boolean}
         * @private
         */
        this._isSelected = false;

        /**
         * Pointer for drawing shape (x, y)
         * @type {Object}
         * @private
         */
        this._startPoint = {};

        /**
         * Using shortcut on drawing shape
         * @type {boolean}
         * @private
         */
        this._withShiftKey = false;
    }

    /**
     * Start to draw the shape on canvas
     * @ignore
     */
    start() {
        const canvas = this.getCanvas();

        this._isSelected = false;

        canvas.defaultCursor = 'crosshair';
        canvas.selection = false;
        canvas.uniScaleTransform = true;
        canvas.on({
            'mouse:down': this._onFabricMouseDown
        });

        fabric.util.addListener(document, 'keydown', this._onKeyDown);
        fabric.util.addListener(document, 'keyup', this._onKeyUp);
    }

    /**
     * End to draw the shape on canvas
     * @ignore
     */
    end () {
        const canvas = this.getCanvas();

        this._isSelected = false;

        canvas.defaultCursor = 'default';

        canvas.selection = true;
        canvas.uniScaleTransform = false;
        canvas.off({
            'mouse:down': this._onFabricMouseDown
        });

        fabric.util.removeListener(document, 'keydown', this._onKeyDown);
        fabric.util.removeListener(document, 'keyup', this._onKeyUp);
    }

    /**
     * Add the shape
     * @ignore
     * @param {string} type - Shape type (ex: 'rect', 'circle')
     * @param {Object} options - Shape options
     *      @param {string} [options.fill] - Shape foreground color (ex: '#fff', 'transparent')
     *      @param {string} [options.stroke] - Shape outline color
     *      @param {number} [options.strokeWidth] - Shape outline width
     *      @param {number} [options.width] - Width value (When type option is 'rect', this options can use)
     *      @param {number} [options.height] - Height value (When type option is 'rect', this options can use)
     *      @param {number} [options.rx] - Radius x value (When type option is 'circle', this options can use)
     *      @param {number} [options.ry] - Radius y value (When type option is 'circle', this options can use)
     *      @param {number} [options.isRegular] - Whether scaling shape has 1:1 ratio or not
     * @returns {Promise}
     */
    add (type, options) {
        return new Promise(resolve => {
            const canvas = this.getCanvas();
            options = this._createOptions(options);
            const shapeObj = this._createInstance(type, options);

            shapeObj.hasBorders = false;
            shapeObj.hasControls = false;

            // helper.resize初始化
            this._shapeObj = shapeObj;
            resizeHelper.setOrigins(shapeObj)

            canvas.add(shapeObj).setActiveObject(shapeObj);
            // canvas.moveTo(shapeObj, 1)
            resolve();
        });
    }

    /**
     * Create the instance of shape
     * @param {string} type - Shape type
     * @param {Object} options - Options to creat the shape
     * @returns {fabric.Object} Shape instance
     * @private
     */
    _createInstance(type, options) {
        let instance;

        switch (type) {
            case 'rect':
                instance = new fabric.Rect(options);
                break;
            case 'circle':
                instance = new fabric.Ellipse(_.merge({
                    type: 'circle'
                }, options));
                break;
            case 'triangle':
                instance = new fabric.Triangle(options);
                break;
            default:
                instance = {};
        }

        return instance;
    }

    /**
     * Get the options to create the shape
     * @param {Object} options - Options to creat the shape
     * @returns {Object} Shape options
     * @private
     */
    _createOptions(options) {
        const selectionStyles = consts.fObjectOptions.SELECTION_STYLE;

        options = _.merge({}, this._options, selectionStyles, options);

        if (options.isRegular) {
            options.lockUniScaling = true;
        }

        return options;
    }

    /**
     * MouseDown event handler on canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */
    _onFabricMouseDown = (fEvent) => {
        // if (fEvent.target) {}
        console.log(231, fEvent.target)
        if (!this.shouldMouseDown(fEvent.target)) return;
        const canvas = this.getCanvas();
        this._startPoint = canvas.getPointer(fEvent.e);

        canvas.on({
            'mouse:move': this._onFabricMouseMove,
            'mouse:up': this._onFabricMouseUp
        });
    }

    /**
     * MouseDown event handler on canvas
     * @param {{target: fabric.Object, e: MouseEvent}} fEvent - Fabric event object
     * @private
     */
    _onFabricMouseMove = (fEvent) => {
        const canvas = this.getCanvas();
        const pointer = canvas.getPointer(fEvent.e);
        const startPointX = this._startPoint.x;
        const startPointY = this._startPoint.y;
        const width = startPointX - pointer.x;
        const height = startPointY - pointer.y;
        const shape = this._shapeObj;

        if (!shape) {
            this.add(this._type, {
                left: startPointX,
                top: startPointY,
                width,
                height
            })
        } else {
            this._shapeObj.set({
                isRegular: this._withShiftKey
            });
            resizeHelper.resize(shape, pointer);
            canvas.renderAll();
        }
    }

    /**
     * MouseUp event handler on canvas
     * @private
     */
    _onFabricMouseUp = () => {
        const canvas = this.getCanvas();
        const shape = this._shapeObj;

        if (shape) {
            resizeHelper.adjustOriginToCenter(shape);
            this.registry(shape)
            
            shape.hasBorders = false;
            shape.hasControls = false;
            canvas.deactivateAll()
            shape.selectable = false;

            shape.sendToBack();
            console.log(158)
        }

        // this.fire(eventNames.ADD_OBJECT_AFTER, this.graphics.createObjectProperties(shape));
        this._shapeObj = null;
        canvas.off({
            'mouse:move': this._onFabricMouseMove,
            'mouse:up': this._onFabricMouseUp
        });
    }

    /**
     * Keydown event handler on document
     * @param {KeyboardEvent} e - Event object
     * @private
     */
    _onKeyDown = (e) => {
        if (e.keyCode === KEY_CODES.SHIFT) {
            this._withShiftKey = true;

            if (this._shapeObj) {
                this._shapeObj.isRegular = true;
            }
        }
    }

    /**
     * Keyup event handler on document
     * @param {KeyboardEvent} e - Event object
     * @private
     */
    _onKeyUp = (e) => {
        if (e.keyCode === KEY_CODES.SHIFT) {
            this._withShiftKey = false;

            if (this._shapeObj) {
                this._shapeObj.isRegular = false;
            }
        }
    }
}

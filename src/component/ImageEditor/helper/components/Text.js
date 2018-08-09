/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Text module
 */
import {fabric} from 'fabric';
import snippet from 'tui-code-snippet';
import Component from '../interface/component';
import consts from '../consts';

const defaultOptions = {
    fill: '#000000',
    left: 0,
    top: 0,
    width: 500
};

const defaultText = 'default text'

/**
 * Text
 * @class Text
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
export default class Text extends Component {
    _options = defaultOptions

    constructor(graphics) {
        super(consts.componentNames.TEXT, graphics);

        /**
         * Previous state of editing
         * @type {boolean}
         */
        this.isPrevEditing = false;
    }

    /**
     * Start input text mode
     */
    start(options) {
        this.beforeStart(options)
        const canvas = this.getCanvas();

        canvas.defaultCursor = 'text';

        canvas.forEachObject(obj => {
            if (this.graphics.isText(obj)) {
                obj.selectable = true;
            }
        });

        canvas.on({
            'mouse:down': this._onFabricMouseDown
        });
    }

    /**
     * End input text mode
     */
    end () {
        const canvas = this.getCanvas();

        canvas.defaultCursor = 'default';
        this.isPrevEditing = false;

        canvas.forEachObject(obj => {
            if (this.graphics.isText(obj)) {
                if (obj.text === '') {
                    obj.remove();
                } else {
                    obj.selectable = false;
                }
            }
        });

        canvas.off({
            'mouse:down': this._onFabricMouseDown
        });
    }

    /**
     * Add new text on canvas image
     * @param {string} text - Initial input text
     * @param {Object} options - Options for generating text
     *     @param {Object} [options.styles] Initial styles
     *         @param {string} [options.styles.fill] Color
     *         @param {string} [options.styles.fontFamily] Font type for text
     *         @param {number} [options.styles.fontSize] Size
     *         @param {string} [options.styles.fontStyle] Type of inclination (normal / italic)
     *         @param {string} [options.styles.fontWeight] Type of thicker or thinner looking (normal / bold)
     *         @param {string} [options.styles.textAlign] Type of text align (left / center / right)
     *         @param {string} [options.styles.textDecoraiton] Type of line (underline / line-throgh / overline)
     *     @param {{x: number, y: number}} [options.position] - Initial position
     * @returns {Promise}
     */
    add (position) {
        return new Promise(resolve => {
            const canvas = this.getCanvas();

            const text = this._options.text || defaultText
            let newText = null;
            let selectionStyle = consts.fObjectOptions.SELECTION_STYLE;
            let styles = this._options;

            this._setInitPos(position);

            newText = new fabric.IText(text);
            selectionStyle = snippet.extend({}, selectionStyle, {
                originX: 'left',
                originY: 'top'
            }, this._options);

            newText.set(selectionStyle);
            newText.hasControls = false;
                
            canvas.add(newText);
            canvas.setActiveObject(newText);
            newText.bringToFront();

            this.registry(newText)

            this.isPrevEditing = true;
            resolve(newText);
        });
    }

    /**
     * Set initial position on canvas image
     * @param {{x: number, y: number}} [position] - Selected position
     * @private
     */
    _setInitPos(position) {
        position = position || this.getCanvasImage().getCenterPoint();

        this._options.left = position.x;
        this._options.top = position.y;
    }

    /**
     * Fabric 'mousedown' event handler
     * @param {fabric.Event} fEvent - Current mousedown event on selected object
     * @private
     */
    _onFabricMouseDown = (fEvent) => {
        console.log('text mousedown')
        const obj = fEvent.target;

        if (obj && this.graphics.isText(obj)) {
            this.isPrevEditing = true;
            return;
        }

        if (this.isPrevEditing) {
            this.isPrevEditing = false;

            return;
        }

        const e = fEvent.e || {};
        const originPointer = this.getCanvas().getPointer(e);

        this.add(originPointer)
    }
}

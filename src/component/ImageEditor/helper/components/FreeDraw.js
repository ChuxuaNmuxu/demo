const {fabric} = require('fabric');
import Component from '../interface/component';
import consts from '../consts';

/**
 * FreeDrawing
 * @class FreeDrawing
 * @param {Graphics} graphics - Graphics instance
 * @extends {Component}
 * @ignore
 */
class FreeDrawing extends Component {
    constructor(graphics) {
        super(consts.componentNames.FREEDRAW, graphics);

        /**
         * Brush width
         * @type {number}
         */
        this.width = 12;

        /**
         * fabric.Color instance for brush color
         * @type {fabric.Color}
         */
        this.oColor = new fabric.Color('rgba(0, 0, 0, 0.5)');
    }

    /**
     * Start free drawing mode
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    start(setting) {
        const canvas = this.getCanvas();

        canvas.isDrawingMode = true;
        this.setBrush(setting);

        canvas.on('path:created', ({path}) => {
            path.set({
                lockMovementX: true,
                lockMovementY: true
            });
            path.hasBorders = false;
            path.hasControls = false;
            path.sendToBack();
            this.registry(path)

            canvas.deactivateAll()
            path.selectable = false;
        })
    }

    /**
     * Set brush
     * @param {{width: ?number, color: ?string}} [setting] - Brush width & color
     */
    setBrush(setting) {
        const brush = this.getCanvas().freeDrawingBrush;

        setting = setting || {};
        this.width = setting.width || this.width;
        if (setting.color) {
            this.oColor = new fabric.Color(setting.color);
        }
        brush.width = this.width;
        brush.color = this.oColor.toRgba();
    }

    /**
     * End free drawing mode
     */
    end() {
        const canvas = this.getCanvas();

        canvas.isDrawingMode = false;
    }
}

module.exports = FreeDrawing;

import invariant from 'invariant'

/**
 * DrawingMode interface
 * @class
 * @param {string} name - drawing mode name
 * @ignore
 */
class DrawingMode {
    constructor(name) {
        /**
         * the name of drawing mode
         * @type {string}
         */
        this.name = name;
    }

    /**
     * Get this drawing mode name;
     * @returns {string} drawing mode name
     */
    getName() {
        return this.name;
    }

    /**
    * start this drawing mode
    * @param {Object} options - drawing mode options
    * @abstract
    */
    start() {
        invariant(false, 'Should implement a method: start');
    }

    /**
     * stop this drawing mode
     * @abstract
     */
    stop() {
        invariant(false, 'Should implement a method: stop');
    }
}
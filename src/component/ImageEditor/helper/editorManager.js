import Graphics from './graphics';
import _ from 'lodash';
import invariant from 'invariant'

class Manager {
    graphicsMap = {};

    constructor () {
    }
    
    // 注册编辑器
    registryGraphics (canvasId, options) {
        invariant(
            canvasId,
            'canvasId is required'
        ) 

        // options = _.merge(options);

        const graphics = new Graphics(canvasId, options);
        this.graphicsMap[canvasId] = graphics;
    }

    getGraphics (canvasId) {
        if (!canvasId || !this.graphicsMap[canvasId]) return null;

        return this.graphicsMap[canvasId]
    }


}

export default new Manager()

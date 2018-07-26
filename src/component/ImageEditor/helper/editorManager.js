import Graphics from './graphics';
import _ from 'lodash'

class Manager {
    graphicsMap = {};

    constructor () {
    }
    
    // 注册编辑器
    registryGraphics (canvasId, options) {
        if (!canvasId) return;

        options = _.merge(options, {
            canvasOptions: {
                maxWidth: 800,
                minWidth: 800,
                backgroundColor: 'red'
            }
        })

        const graphics = new Graphics(canvasId, options);
        this.graphicsMap[canvasId] = graphics;
    }

    getGraphics (canvasId) {
        if (!canvasId || !this.graphicsMap[canvasId]) return null;

        return this.graphicsMap[canvasId]
    }


}

export default new Manager()

import Graphics from './graphics'

class Manager {
    graphicsMap = {};

    constructor () {
    }
    
    // 注册编辑器
    registryGraphics (canvasId, options) {
        if (!canvasId) return;

        const graphics = new Graphics(canvasId, options);
        this.graphicsMap[canvasId] = graphics;
    }

    getGraphics (canvasId) {
        if (!canvasId || !this.graphicsMap[canvasId]) return null;

        return this.graphicsMap[canvasId]
    }


}

export default new Manager()

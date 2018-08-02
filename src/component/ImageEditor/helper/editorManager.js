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

    save (id, options = {}) {
        const {type = 'image/png', quality = 1} = options

        const graphics = this.getGraphics(id);
        const canvas = graphics.getCanvas();

        canvas.deactivateAll().renderAll()

        return document.querySelector(`#${id}`);
        // const canvasNode = document.querySelector(`#${id}`);

        // const dataUrl = canvasNode.toDataURL(type, quality);

        // const img = document.createElement('img');
        // img.src = dataUrl;

        // img.onload = () => {
        //     document.querySelector('#copy').appendChild(img)
        // }
    }
}

export default new Manager()

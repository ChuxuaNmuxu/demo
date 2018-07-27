/**
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 * @fileoverview Image loader
 */
import Component from '../interface/component';
import consts from '../consts';

const {componentNames, rejectMessages} = consts;
const imageOption = {
    padding: 0,
    crossOrigin: 'Anonymous'
};

/**
 * ImageLoader components
 * @extends {Component}
 * @class ImageLoader
 * @param {Graphics} graphics - Graphics instance
 * @ignore
 */
export default class ImageLoader extends Component {
    constructor(graphics) {
        super(componentNames.IMAGE_LOADER, graphics);
    }

    /**
     * Load image from url
     * @param {?string} imageName - File name
     * @param {?(fabric.Image|string)} img - fabric.Image instance or URL of an image
     * @returns {jQuery.Deferred} deferred
     */
    load (img, options) {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', img)

        return new Promise((resolve, reject) => {
            imgElement.onload = () => {
                const image = new fabric.Image(imgElement, options)
                this.getCanvas().add(image);

                // this.setCanvasImage(img, image);
                // this.adjustCanvasDimension();
                resolve(image)
                this.graphics.componentStack.registryComponent(image);
            }
            imgElement.onError = () => {
                reject(new Error('image load failed'))
            }
        })
    }
}

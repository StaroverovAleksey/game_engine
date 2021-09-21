import {CELL_HALF_HEIGHT} from "../tools/constans";

export default class ImageLayer {
    constructor() {
        this.canvas = this._getCanvas();
        this.context = this.canvas.getContext('2d');
        window.addEventListener('resize', this._resizeHandler);
        this._resizeHandler();
    }

    _getCanvas = () => {
        return window.document.getElementsByTagName('canvas')[1];
    }

    _setSize = () => {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    _resizeHandler = () => {
        this.width = window.document.documentElement.clientWidth;
        this.height = window.document.documentElement.clientHeight;
        this._setSize();
    }

    drawImage = (x, y, img, data) => {
        if (!data) {
            return;
        }
        const {context} = this;
        const {cX, cY, sX, sY} = data;
        context.drawImage(img, cX, cY, sX, sY, x, y - CELL_HALF_HEIGHT, sX, sY);
    }

}

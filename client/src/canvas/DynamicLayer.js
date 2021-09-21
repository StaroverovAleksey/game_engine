import {CELL_HALF_HEIGHT} from "../tools/constans";

export default class DynamicLayer {
    constructor() {
        this.canvas = this._getCanvas();
        this.context = this.canvas.getContext('2d');
        window.addEventListener('resize', this._resizeHandler);
        window.addEventListener('mouseout', this._mouseOutHandler);
        this._resizeHandler();
        this.chosenSection = null;
    }

    _getCanvas = () => {
        return window.document.getElementsByTagName('canvas')[2];
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

    clearCanvas = () => {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    _mouseOutHandler = () => {
        this.clearCanvas();
    }

    drawImage = (x, y, img, data) => {
        if (!data) {
            this.clearCanvas();
            return;
        }
        const {context} = this;
        const {cX, cY, sX, sY} = data;
        this.clearCanvas();
        context.drawImage(img, cX, cY, sX, sY, x, y - CELL_HALF_HEIGHT, sX, sY);
    }

}

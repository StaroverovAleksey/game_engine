import {CELL_HALF_HEIGHT} from "../tools/constans";

export default class ImageLayer {
    constructor() {
        this.canvas = this._getCanvas();
        this.context = this.canvas.getContext('2d');
        window.addEventListener('resize', this._resizeHandler);
        this._resizeHandler();
        this.data = {};
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

    setCoord = (x, y) => {
        if (!this.chosenSection) {
            return;
        }
        const {context} = this;
        const {cX, cY, sX, sY} = this.chosenSection;
        //this.clearCanvas();
        context.drawImage(this.img, cX, cY, sX, sY, x, y - CELL_HALF_HEIGHT, sX, sY);
    }

    setImage = (img, chosenSection) => {
        this.img = img;
        this.chosenSection = chosenSection;
    }

}

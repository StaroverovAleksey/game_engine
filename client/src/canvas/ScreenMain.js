import {CELL_HALF_HEIGHT, CELL_HEIGHT, CELL_WIDTH} from "../utils/constans";

export class ScreenMain {
    constructor() {
        this.canvas = this._getCanvas();
        this.context = this.canvas.getContext('2d');
        window.addEventListener('resize', this._resizeHandler);
        window.addEventListener('mouseout', this._mouseOutHandler);
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

    _clearCanvas = () => {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    _mouseOutHandler = () => {
        this._clearCanvas();
    }

    getPixelColor = (x, y) => {
        const {context} = this;
        const pixelData = context.getImageData(x, y, 1, 1).data;
        return `rgba(${pixelData[0]},${pixelData[1]},${pixelData[2]},${pixelData[2] / 250})`;
    }

    setCoord = (x, y) => {
        this._clearCanvas();
        this.getRhombus(x, y, 'red');
    }

    getRhombus = (x, y, color) => {
        const {context} = this;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + CELL_HEIGHT, y - CELL_HALF_HEIGHT);
        context.lineTo(x + CELL_WIDTH, y);
        context.lineTo(x + CELL_HEIGHT, y + CELL_HALF_HEIGHT);
        context.lineTo(x, y);
        context.fill();
    }

}

export class ScreenModel {
    constructor() {
        this.canvas = this._getCanvas();
        this.context = this.canvas.getContext('2d');
        window.addEventListener('resize', this._resizeHandler);
        this._resizeHandler();
    }

    _resizeHandler = () => {
        this.width = window.document.documentElement.clientWidth;
        this.height = window.document.documentElement.clientHeight;
        this._setSize();
    }

    _getCanvas = () => {
        return window.document.getElementsByTagName('canvas')[0];

    }

    _clearCanvas = () => {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    _setSize = () => {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }


}

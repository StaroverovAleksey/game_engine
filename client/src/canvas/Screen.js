export class Screen {
    constructor() {
        this.canvas = this._getCanvas();
        this.context = this.canvas.getContext('2d');
        this._resizeHandler();
        window.addEventListener('resize', this._resizeHandler);
    }

    _getCanvas = () => {
        return window.document.getElementsByTagName('canvas')[0];
    }

    _resizeHandler = () => {
        this.width = window.document.documentElement.clientWidth;
        this.height = window.document.documentElement.clientHeight;
        this._setSize();
    }

    _setSize = () => {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

}

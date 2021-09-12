export class Screen {
    constructor(data) {
        this.data = data;
        this.oldCursor = {x: 0, y: 0};
        this.canvas = this._getCanvas();
        this.context = this.canvas.getContext('2d');
        window.addEventListener('resize', this._resizeHandler);
        this.canvas.addEventListener('mousemove', this._mouseMoveHandler);
        this.canvas.addEventListener('mouseout', this._mouseOutHandler);
        this._resizeHandler();
    }

    _resizeHandler = () => {
        this.width = window.document.documentElement.clientWidth;
        this.height = window.document.documentElement.clientHeight;
        this._setSize();
        this.fillSubstrate();
    }

    _mouseMoveHandler = (event) => {
        const truncX = Math.trunc((event.x) / 64);
        const truncY = Math.trunc((event.y) / 32);
        //console.log(event.x / 64, event.y / 32);

        console.log(this.cartToIso(truncX, truncY));



        if((truncX % 2 !== 0 && truncY % 2 === 0) || (truncX % 2 !== 0 && truncY % 2 !== 0)) {
            //console.log('бел');
        } else {
            //console.log('черн');
        }



        if(this.oldCursor.x !== truncX || this.oldCursor.y !== truncY) {
            console.log(event.x, event.y);
            console.log(truncX, truncY);
            this._clearCanvas();
            this.fillSubstrate();
            this.getRhombus([this.isoToCart(truncX, truncY)[1] * 64, this.isoToCart(truncX, truncY)[0] * 32], 'green');
            this.oldCursor = {x: truncX, y: truncY};
        }
    }

    _mouseOutHandler = () => {
        this._clearCanvas();
        this.fillSubstrate();
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

    getRhombus = ([x, y], color) => {
        const {context} = this;
        context.fillStyle = color;
        context.beginPath();
        context.moveTo(x, y);
        context.lineTo(x + 32, y -16);
        context.lineTo(x + 64, y);
        context.lineTo(x + 32, y + 16);
        context.lineTo(x, y);
        context.fill();
    }

    fillSubstrate = () => {
        //console.log('--LOGGER-- ', 'fillSubstrate');
        const {cellHeight} = this.data;

        for (let i = 0; i < 1000; i+= (cellHeight * 2)) {

            for (let j = 0; j < 1000; j+= cellHeight) {
                this.getRhombus(this.cartToIso(500 + i, j - 500), (j) % 2 ? '#eee' : '#ddd');
                //this.getRhombus(i - cellHeight, j + cellHeight / 2, '#ddd');
            }

        }

    }

    cartToIso = (x, y) => {
        return [x - y, (x + y) / 2];
    }

    isoToCart = (x, y) => {
        return [(y * 2 + x) / 2, (y * 2 - x) / 2];
    }

}

import {CELL_HALF_HEIGHT, CELL_HEIGHT, CELL_WIDTH} from "../utils/constans";

export class ScreenSubstrate {
    constructor(callback) {
        this.callback = callback;
        this.rhombusSide = this.getSide(0, 0, CELL_HEIGHT, CELL_HALF_HEIGHT);
        this.rhombusArea = this.triangleArea(this.rhombusSide, this.rhombusSide, CELL_HEIGHT) * 2;
        this.oldCursor = {x: 0, y: 0};
        this.canvas = this._getCanvas();
        this.context = this.canvas.getContext('2d');
        window.addEventListener('resize', this._resizeHandler);
        window.addEventListener('mousemove', this._mouseMoveHandler);
        this._resizeHandler();
    }

    _getCanvas = () => {
        return window.document.getElementsByTagName('canvas')[0];
    }

    _setSize = () => {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    _resizeHandler = () => {
        this.width = window.document.documentElement.clientWidth;
        this.height = window.document.documentElement.clientHeight;
        this._setSize();
        this.fillSubstrate();
    }

    _clearCanvas = () => {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    _mouseMoveHandler = (event) => {
        const truncX = Math.trunc((event.x) / CELL_WIDTH);
        const truncY = Math.trunc((event.y) / CELL_HEIGHT);
        const remainderX = event.x % CELL_WIDTH;
        const remainderY = event.y % CELL_HEIGHT;

        let x; let y;
        switch (true) {
            case this.pointEnterRhombus(remainderX, remainderY):
                x = truncX * CELL_WIDTH; y = truncY * CELL_HEIGHT + CELL_HALF_HEIGHT;
                break;
            case remainderX < CELL_HEIGHT && remainderY < CELL_HALF_HEIGHT:
                x = truncX * CELL_WIDTH - CELL_HEIGHT; y = truncY * CELL_HEIGHT;
                break;
            case remainderX > CELL_HEIGHT && remainderY < CELL_HALF_HEIGHT:
                x = truncX * CELL_WIDTH + CELL_HEIGHT; y = truncY * CELL_HEIGHT;
                break;
            case remainderX < CELL_HEIGHT && remainderY > CELL_HALF_HEIGHT:
                x = truncX * CELL_WIDTH - CELL_HEIGHT; y = truncY * CELL_HEIGHT + CELL_HEIGHT;
                break;
            case remainderX > CELL_HEIGHT && remainderY > CELL_HALF_HEIGHT:
                x = truncX * CELL_WIDTH + CELL_HEIGHT; y = truncY * CELL_HEIGHT + CELL_HEIGHT;
                break;
        }

        if (this.oldCursor.x !== x || this.oldCursor.y !== y) {
            this.callback (x, y);
            this.oldCursor = {x, y};
        }
    }

    getPixelColor = (x, y) => {
        const {context} = this;
        const pixelData = context.getImageData(x, y, 1, 1).data;
        return `rgba(${pixelData[0]},${pixelData[1]},${pixelData[2]},${pixelData[2] / 250})`;
    }

    pointEnterRhombus = (x, y) => {
        const a = [CELL_HEIGHT, 0];
        const b = [CELL_WIDTH, CELL_HALF_HEIGHT];
        const c = [CELL_HEIGHT, CELL_HEIGHT];
        const d = [0, CELL_HALF_HEIGHT];

        const oa = this.getSide(x, y, a[0], a[1]);
        const ob = this.getSide(x, y, b[0], b[1]);
        const oc = this.getSide(x, y, c[0], c[1]);
        const od = this.getSide(x, y, d[0], d[1]);

        const aob = this.triangleArea(oa, ob, this.rhombusSide);
        const boc = this.triangleArea(oc, ob, this.rhombusSide);
        const cod = this.triangleArea(oc, od, this.rhombusSide);
        const aod = this.triangleArea(oa, od, this.rhombusSide);
        const checkArea = aob + boc + cod + aod;
        return checkArea - this.rhombusArea < 3 && this.rhombusArea - checkArea < 3;
    }

    triangleArea = (a, b, c) => {
        const p = (a + b + c) / 2;
        return Math.round(Math.sqrt(p * (p - a) * (p - b) * (p - c)));
    }

    getSide = (x1, y1, x2, y2) => {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
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

    fillSubstrate = () => {
        console.log('--LOGGER-- ', 'fillSubstrate');
        for (let i = 0; i < this.width + CELL_HEIGHT; i+= CELL_WIDTH) {

            for (let j = CELL_HALF_HEIGHT; j < this.height + CELL_HEIGHT; j+= CELL_HEIGHT) {
                this.getRhombus(i, j, '#eee');
                this.getRhombus(i - CELL_HEIGHT, j - CELL_HALF_HEIGHT, '#ddd');
            }

        }
    }

}

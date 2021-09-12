import {Screen} from "./Screen";
//import {ImageLoader} from "./ImageLoader";

export class Game {
    constructor(data, loadCallback) {
        this.data = data;
        this.oldData = {};
        this.loadCallback = loadCallback;
        this.images = {};
        this.screen = new Screen(data);
    }

    initial = async () => {
        const {artPaths} = this.data;
        //const loader = new ImageLoader(artPaths);
        //this.images = await loader.load();
        this.loadCallback(false);
    }

    updateData = () => {

    }

    run = () => {
        requestAnimationFrame((time) => this.frame(time))
    }

    frame = () => {
        requestAnimationFrame((time) => this.frame(time))
    }

    getRhombus = ([x, y, color]) => {
        const {context} = this.screen;
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
        const {cellHeight} = this.data;

        for (let i = 0; i < this.screen.width + cellHeight; i+= (cellHeight * 2)) {

            for (let j = 0; j < this.screen.height + cellHeight; j+= cellHeight) {
                this.getRhombus([i, j, '#eee']);
                this.getRhombus([i - cellHeight, j + cellHeight / 2, '#ddd']);
            }

        }

    }
}

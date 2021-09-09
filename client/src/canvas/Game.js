import {Screen} from "./Screen";
//import {ImageLoader} from "./ImageLoader";

export class Game {
    constructor(data, loadCallback) {
        this.data = data;
        this.oldData = {};
        this.loadCallback = loadCallback;
        this.images = {};
        this.screen = new Screen();
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
        this.fill();
        requestAnimationFrame((time) => this.frame(time))
    }

    fill = () => {
        const {context} = this.screen;
        const {sizeMap, sizeCell} = this.data;
        const start = {
            x: 800,
            y: 300
        }

        for (let i = 1; i <= sizeMap.x; i++) {
            context.moveTo(
                start.x + (i * sizeCell.y),
                start.y + (i * sizeCell.y / 2)
            );
            console.log('START', (i * sizeCell.y),
                (i * sizeCell.y / 2));
            context.lineTo(
                start.x + sizeMap.x * sizeCell.y + (i * sizeCell.y),
                start.y -(sizeMap.y * sizeCell.y / 2)  + (i * sizeCell.y / 2)
            );
            console.log('FINISH', sizeMap.x * sizeCell.y + (i * sizeCell.y),
                -(sizeMap.y * sizeCell.y / 2)  + (i * sizeCell.y / 2));
        }

        for (var y = 0.5; y < 400; y += 10) {
            //console.log(y)
            context.moveTo(0, y);
            context.lineTo(400, y);
        }

        context.strokeStyle = "#888";
        context.stroke();
    }
}

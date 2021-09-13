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
        requestAnimationFrame((time) => this.frame(time))
    }
}

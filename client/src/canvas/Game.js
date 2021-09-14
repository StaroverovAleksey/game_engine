import {ScreenSubstrate} from "./ScreenSubstrate";
import {ScreenMain} from "./ScreenMain";
//import {ImageLoader} from "./ImageLoader";

export class Game {
    constructor(data, loadCallback) {
        this.data = data;
        this.oldData = {};
        this.loadCallback = loadCallback;
        this.images = {};
        this.screenSubstrate = new ScreenSubstrate(this.callback);
        this.screenMain = new ScreenMain();
    }

    initial = async () => {
        const {artPaths} = this.data;
        //const loader = new ImageLoader(artPaths);
        //this.images = await loader.load();
        this.loadCallback(false);
    }

    callback = (x, y) => {
        this.screenMain.setCoord(x, y);
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

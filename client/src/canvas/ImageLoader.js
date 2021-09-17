export default class ImageLoader {
    constructor(jsonMaps) {
        this.jsonMaps = jsonMaps;
        this.images = {};
    }

    load = async () => {
        const promises = [];
        Object.keys(this.jsonMaps).forEach((value) => {
            promises.push(this.loadImage(value));
        })
        await Promise.all(promises);
        return this.images;
    }

    loadImage = (value) => {
        return new Promise((resolve) => {
            const image = new Image();
            this.images[value] = image;
            image.onload = () => resolve();
            image.src = `http://localhost/${value}.png`;
        });
    }
}

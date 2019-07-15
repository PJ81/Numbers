

class Resources {
    constructor(cb) {
        this.images = new Array(25);
        
        Promise.all([
            (loadImage("./img/cl.png")).then((i) => {this.images[Grfx.CL] = i;}),

            (loadImage("./img/1G.png")).then((i) => {this.images[Grfx.G1] = i;}),
            (loadImage("./img/2G.png")).then((i) => {this.images[Grfx.G2] = i;}),
            (loadImage("./img/3G.png")).then((i) => {this.images[Grfx.G3] = i;}),
            (loadImage("./img/4G.png")).then((i) => {this.images[Grfx.G4] = i;}),
            (loadImage("./img/5G.png")).then((i) => {this.images[Grfx.G5] = i;}),
            (loadImage("./img/6G.png")).then((i) => {this.images[Grfx.G6] = i;}),

            (loadImage("./img/1R.png")).then((i) => {this.images[Grfx.R1] = i;}),
            (loadImage("./img/2R.png")).then((i) => {this.images[Grfx.R2] = i;}),
            (loadImage("./img/3R.png")).then((i) => {this.images[Grfx.R3] = i;}),
            (loadImage("./img/4R.png")).then((i) => {this.images[Grfx.R4] = i;}),
            (loadImage("./img/5R.png")).then((i) => {this.images[Grfx.R5] = i;}),
            (loadImage("./img/6R.png")).then((i) => {this.images[Grfx.R6] = i;}),

            (loadImage("./img/1T.png")).then((i) => {this.images[Grfx.T1] = i;}),
            (loadImage("./img/2T.png")).then((i) => {this.images[Grfx.T2] = i;}),
            (loadImage("./img/3T.png")).then((i) => {this.images[Grfx.T3] = i;}),
            (loadImage("./img/4T.png")).then((i) => {this.images[Grfx.T4] = i;}),
            (loadImage("./img/5T.png")).then((i) => {this.images[Grfx.T5] = i;}),
            (loadImage("./img/6T.png")).then((i) => {this.images[Grfx.T6] = i;}),

            (loadImage("./img/1Y.png")).then((i) => {this.images[Grfx.Y1] = i;}),
            (loadImage("./img/2Y.png")).then((i) => {this.images[Grfx.Y2] = i;}),
            (loadImage("./img/3Y.png")).then((i) => {this.images[Grfx.Y3] = i;}),
            (loadImage("./img/4Y.png")).then((i) => {this.images[Grfx.Y4] = i;}),
            (loadImage("./img/5Y.png")).then((i) => {this.images[Grfx.Y5] = i;}),
            (loadImage("./img/6Y.png")).then((i) => {this.images[Grfx.Y6] = i;})
            
        ]).then(() => {
            cb();
        });
    }

    image(index) {
        if(index < this.images.length) {
            return this.images[index];
        }
        return null;
    }
}
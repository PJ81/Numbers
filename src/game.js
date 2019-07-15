
class Game {
	constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = "canvas";
		this.canvas.width = Const.DIM * Const.SCALE;
        this.canvas.height = Const.DIM * Const.SCALE;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.scale(Const.SCALE, Const.SCALE);

        this.lastTime = 0;
        this.accumulator = 0;
        this.deltaTime = 1 / 60;

		this.loop = (time) => {
			this.accumulator += (time - this.lastTime) / 1000;
			while(this.accumulator > this.deltaTime) {
				this.accumulator -= this.deltaTime;
                this.state.update(Math.min(this.deltaTime, .5));
			}

            this.lastTime = time;

            this.ctx.clearRect(0, 0, Const.DIM, Const.DIM);
            this.state.draw(this.ctx);
			requestAnimationFrame(this.loop);
        }

        this.numbers = new Numbers();
        this.state = this.numbers;
        this.addElements();

        this.state.start();

        this.canvas.addEventListener("mousedown", (e) => {
            this.state.input(e);
        }, false);
        this.canvas.addEventListener("touchstart", (e) => {
            this.state.input(e);
        }, false);

        this.loop(0);
    }

    addElements() {
        const e = document.getElementById("board"),
              b = document.getElementById("btns"), 
              bt1 = document.createElement("button"),
              bt2 = document.createElement("button");

        e.appendChild(this.canvas);
        bt1.id = "undo";
        bt1.innerHTML = "UNDO";
        bt1.addEventListener("mousedown", () => {
            this.numbers.undoMove();
        });
        bt2.id = "new";
        bt2.innerHTML = "NEW";
        bt2.addEventListener("mousedown", () => {
            this.numbers.newLvl();
        });
        
        b.appendChild(bt1);
        b.appendChild(bt2);

    }
}

const R = new Resources(() => new Game());
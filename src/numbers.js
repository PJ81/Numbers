

class Numbers extends State {
    constructor() {
        super();
        this.dir = [
            {x:-1, y:-1}, {x: 0, y:-1}, {x: 1, y:-1}, {x:-1, y: 0}, 
            {x: 1, y: 0}, {x:-1, y: 1}, {x: 0, y: 1}, {x: 1, y: 1}
        ];
        this.selected = {x:-1, y:-1};
        this.board = [];
        this.solution = [];
        this.undo = [];
        this.createLevel();
    }

    createLevel() {
        this.undo = [];
        this.board = [];
        this.solution = [];
        for(let a = 0; a < Const.LVL_SIZE; a++) {
            this.board[a] = new Array();
            this.solution[a] = new Array();
            for(let b = 0; b < Const.LVL_SIZE; b++) {
                this.board[a][b] = {
                    val: 0,
                    sho: false,
                    sel: false,
                    gry: false
                };
                this.solution[a][b] = 0;
            }
        }
        const t = (Const.LVL_SIZE * Const.LVL_SIZE) * .8;
        for(let b = 0; b < t; b++) {
            let tries = 1000;
            while(tries) {
                const c = rand(0, Const.LVL_SIZE), r = rand(0, Const.LVL_SIZE),
                      v = rand(1, Const.LVL_SIZE);
                if(this.isValid(c, r, v)) {
                    this.solution[c][r] = v;
                    break;
                }
                tries--;
            }
        }
    }

    isValid(c, r, v) {
        if(this.board[c][r].val === 0) {
            const dir = rand(0, 8),
                  cc = c + v * this.dir[dir].x,
                  rr = r + v * this.dir[dir].y;
            if(cc > -1 && rr > -1 && cc < Const.LVL_SIZE && rr < Const.LVL_SIZE && this.board[cc][rr].val === 0) {
                this.board[cc][rr].val = v;
                return true;
            }
        }
        return false; 
    }

    undoMove() {
        if(this.undo.length) {
            const g = this.undo.splice(this.undo.length - 1, 1)[0],
                  b = this.board[g.ox][g.oy],
                  n = this.board[g.nx][g.ny];
            b.val = n.val;
            n.val = 0;
            b.sho = b.sel = b.gry = n.sho = n.sel = n.gry = false;
        }
    }

    newLvl() {
        this.createLevel();
    }

    update(dt) {
        //
    }

    draw(ctx) {
        let img;
        for(let b = 0; b < Const.LVL_SIZE; b++) {
            for(let a = 0; a < Const.LVL_SIZE; a++) {
                const g = this.board[a][b];
                switch(g.val) {
                    case 0: 
                        img = R.image(Grfx.CL); 
                    break;
                    case 1: 
                        img = g.sho ? R.image(Grfx.T1) : g.sel ? R.image(Grfx.Y1) : g.gry ? R.image(Grfx.G1) : R.image(Grfx.R1);
                    break;
                    case 2:
                        img = g.sho ? R.image(Grfx.T2) : g.sel ? R.image(Grfx.Y2) : g.gry ? R.image(Grfx.G2) : R.image(Grfx.R2);
                    break;
                    case 3: 
                        img = g.sho ? R.image(Grfx.T3) : g.sel ? R.image(Grfx.Y3) : g.gry ? R.image(Grfx.G3) : R.image(Grfx.R3);
                    break;
                    case 4: 
                        img = g.sho ? R.image(Grfx.T4) : g.sel ? R.image(Grfx.Y4) : g.gry ? R.image(Grfx.G4) : R.image(Grfx.R4);
                    break;
                    case 5: 
                        img = g.sho ? R.image(Grfx.T5) : g.sel ? R.image(Grfx.Y5) : g.gry ? R.image(Grfx.G5) : R.image(Grfx.R5);
                    break;
                    case 6: 
                        img = g.sho ? R.image(Grfx.T6) : g.sel ? R.image(Grfx.Y6) : g.gry ? R.image(Grfx.G6) : R.image(Grfx.R6);
                    break;
                }
                ctx.drawImage(img, a * img.width + a * 4, b * img.height + b * 4);
            }
        }
    }

    clearAllShow() {
        for(let b = 0; b < Const.LVL_SIZE; b++) {
            for(let a = 0; a < Const.LVL_SIZE; a++) {
                const g = this.board[a][b];
                if(g.sho) {
                    g.sho = false;
                    if(!g.gry) g.val = 0;
                }
            }
        }

        this.selected.x = -1;
        this.selected.y = -1;
    }

    showAllMoves(v) {
        for(let dir = 0; dir < 8; dir++) {
            const a = this.selected.x + v * this.dir[dir].x,
                  b = this.selected.y + v * this.dir[dir].y;
            if(a > -1 && b > -1 && a < Const.LVL_SIZE && b < Const.LVL_SIZE && this.board[a][b].val === 0) {
                this.board[a][b].val = v;
                this.board[a][b].sho = true;
            }
        }
    }
    
    input(e) {
        let x, y;
        if(e.type === "touchstart") {
            x = Math.floor((e.touches[0].clientX - e.srcElement.offsetLeft) / (TILE + 4));
            y = Math.floor((e.touches[0].clientY - e.srcElement.offsetTop) / (TILE + 4));

            e.preventDefault();
            console.log(e)

        } else {
            x = Math.floor((e.clientX - e.srcElement.offsetLeft) / (TILE + 4));
            y = Math.floor((e.clientY - e.srcElement.offsetTop) / (TILE + 4));

            console.log(e, x, y)
        }

        if(x === null || y === null || x >= Const.LVL_SIZE || y >= Const.LVL_SIZE) return;

        const g = this.board[x][y];
        if(g.gry) return;

        if(g.sel) {
            g.sel = false;
            this.clearAllShow();
            return
        }

        if(g.sho) {
            this.undo.push({
                ox: this.selected.x,
                oy: this.selected.y,
                nx: x,
                ny: y
            });
            this.board[this.selected.x][this.selected.y].sel = false;
            this.board[this.selected.x][this.selected.y].val = 0;
            g.gry = true;
            this.clearAllShow();
            return;
        }

        if(g.val === 0) return;

        if(this.selected.x > -1) {
            this.board[this.selected.x][this.selected.y].sel = false;
            this.clearAllShow();
        }

        g.sel = true;
        this.selected.x = x;
        this.selected.y = y;
        this.showAllMoves(g.val);
    }
}
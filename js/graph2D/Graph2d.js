class Graph2d {
    constructor() {
        const height = 800;
        const width = 1200;

        this.prop = width / height;
        this.WIN = {
            left: -10 * this.prop,
            bottom: -10,
            width: 20 * this.prop,
            height: 20,
        }

        this.canMove = false;
        this.zoomStep = 1;
        this.funcs = [];
        this.mousePosX = 0;
        this.mousePosY = 0;

        this.canvas = new Canvas({
            WIN: this.WIN,
            id: 'graph',
            width,
            height,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mouseUp: () => this.mouseUp(),
                mouseDown: () => this.mouseDown(),
                mouseMove: (event) => this.mouseMove(event),
                mouseLeave: () => this.mouseLeave(),
            },
        });

        new UI({
            changeColor: (num, color) => this.changeColor(num, color),
            changeWidth: (num, width) => this.changeWidth(num, width),
            changeA: (num, value) => this.changeA(num, value),
            changeB: (num, value) => this.changeB(num, value),
            switchIntegralCheckBox: (num) => this.switchIntegralCheckBox(num),
            switchDerivativeCheckBox: (num) => this.switchDerivativeCheckBox(num),
            addFunction: (num, f) => this.addFunction(num, f),
            delFunction: (num) => this.delFunction(num),
            createObjectFunc: (num) => this.createObjectFunc(num),
        })

        setInterval(() => {
            this.render();
        }, 15);

    }

    // canvas

    printOXY() {
        const { left, width, height, bottom } = this.WIN;
        this.canvas.line(left, 0, width + left, 0, 3);
        this.canvas.line(0, bottom, 0, bottom + height, 3);
    }

    grid(color = '#ccc') {
        const { left, width, bottom, height } = this.WIN;
        for (let i = 0; i <= left + width; i++) {
            this.canvas.line(i, bottom, i, bottom + height, 1, color);
        }
        for (let i = 0; i >= left; i--) {
            this.canvas.line(i, bottom, i, bottom + height, 1, color);
        }
        for (let i = 0; i <= bottom + height; i++) {
            this.canvas.line(left, i, left + width, i, 1, color);
        }
        for (let i = 0; i >= bottom; i--) {
            this.canvas.line(left, i, left + width, i, 1, color);
        }
    }

    printNums() {
        const { left, bottom, width, height } = this.WIN;
        const streakLength = height / (width + 30);
        const len = streakLength / 2;
        const shiftY = -height * 0.01 - 0.04;
        const shiftX = width * 0.001 + 0.04;

        for (let i = Math.round(left); i < left + width; i++) {
            this.canvas.line(i, len, i, -len, 2.5);
            this.canvas.printText(i, i + shiftX, shiftY);
        }
        for (let i = Math.round(bottom); i < bottom + height; i++) {
            this.canvas.line(len, i, -len, i, 2.5);
            this.canvas.printText(i, shiftX, i + shiftY);
        }
    }

    //canvas callbacks

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? -this.zoomStep : this.zoomStep;
        if (this.WIN.width + delta * this.prop > 0 && this.WIN.height + delta > 0) {
            this.WIN.width += this.prop * delta;
            this.WIN.height += delta;
            this.WIN.left -= this.prop * delta / 2;
            this.WIN.bottom -= delta / 2;
        }
    }

    mouseUp() {
        this.canMove = false;
    }

    mouseDown() {
        this.canMove = true;
    }

    mouseMove(event) {
        if (this.canMove) {
            this.WIN.left -= this.canvas.sx(event.movementX);
            this.WIN.bottom -= this.canvas.sy(event.movementY);
        }
        this.mousePosY = this.WIN.bottom + this.canvas.sy(event.offsetY);
        this.mousePosX = this.WIN.left + this.canvas.sx(event.offsetX);
    }

    mouseLeave() {
        this.canMove = false;
    }




    //drawing

    printDerivative(f, x) {
        const dx = Math.pow(10, -9),
            k = (f(x + dx) - f(x)) / dx,
            b = f(x) - k * x,
            x1 = this.WIN.left,
            x2 = this.WIN.left + this.WIN.width,
            y1 = k * x1 + b,
            y2 = k * x2 + b;
        this.canvas.line(x1, y1, x2, y2, 1, 'red');
    }

    printFunction(f, color = 'black', lineWidth = 2) {
        const { width, left, height } = this.WIN;
        const dx = width / 1000;
        let x = left;

        while (x < width + left) {
            const y1 = f(x);
            const y2 = f(x + dx);
            if (Math.abs(y1 - y2) < height) {
                this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color);
            }
            else {
                this.canvas.line(x, f(x), x + dx, f(x + dx), lineWidth, color, true);
            }

            x += dx;
        }
    }

    printIntegral(f, a, b, integral, d = 100, color = 'rgb(195, 119, 224, 0.6)') {
        const dx = (b - a) / d;
        let x = a;
        const points = [];
        points.push({ x: a, y: 0 })
        while (x <= b) {
            points.push({ x, y: f(x) });
            x += dx;
        }
        points.push({ x: b, y: f(b) })
        points.push({ x: b, y: 0 })
        this.canvas.polygon(points, color);
        this.canvas.line(a, 0, b, 0, 2, 'orange');
    }

    printRect() {
        const x = Math.floor(this.canvas.x(this.mousePosX));
        const y = Math.ceil(this.canvas.y(this.mousePosY));

        this.canvas.polygon([
            { x, y },
            { x: x + 1, y },
            { x: x + 1, y: y + 1 },
            { x, y: y + 1 }
        ],
            '#ccc3'
        );

        const shiftY = this.WIN.height * 0.01;
        const shiftX = this.WIN.width * 0.01 + 0.02;

        const nums = [
            { x: 0, y: 0, shiftX: -shiftX, shiftY: shiftY },
            { x: 0, y: -1, shiftX: -shiftX, shiftY: -shiftY },
            { x: 1, y: 0, shiftX: 0, shiftY: shiftY },
            { x: 1, y: -1, shiftX: 0, shiftY: -shiftY }
        ];
        nums.forEach(coord => {
            this.canvas.printText(
                `(${coord.x + x}; ${coord.y + y})`,
                x + coord.x + coord.shiftX,
                y + coord.y + coord.shiftY,
            )
        })
    }

    render() {
        this.canvas.clear();
        this.grid();
        this.printNums();
        this.printOXY();

        this.funcs.forEach(func => {
            if (func) {
                const { f, color, width, a, b, showDerivative, showIntegral } = func;
                if (f) {
                    this.printFunction(f, color, width);
                    if (showDerivative) {
                        this.printDerivative(f, this.mousePosX);
                    }
                    if ((a || b) && a !== b) {
                        if(showIntegral){
                            if (a > b) {
                                this.printIntegral(f, b, a, this.getIntegral(f, b, a));
                            } else {
                                this.printIntegral(f, a, b, this.getIntegral(f, a, b))
                            }
                        }
                    this.canvas.point(this.getZero(f,a,b),0); 
                    }
                }
            }
        });
    }
    // Math 

    getIntegral(f, a, b, d = 100) {
        const dx = (b - a) / d;
        let x = a;
        let S = 0;
        while (x <= b) {
            S += (f(x) + f(x + dx)) / 2 * dx;
            x += dx;
        }
        return S;
    }

    getZero(f, a, b, eps = 0.0001) {
        if (f(a) * f(b) > 0) return null;
        if (f(a) === 0) return a;
        if (f(b) === 0) return b;
        if (Math.abs(f(b) - f(a)) <= eps) return (a + b) / 2;
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) return this.getZero(f, a, half, eps)
        if (f(b) * f(half) <= 0) return this.getZero(f, half, b, eps)
        else return null;
    }
 
    //UI callbacks

    changeWidth(num, width) {
        this.funcs[num].width = width;
    }

    changeColor(num, color) {
        this.funcs[num].color = color;
    }

    addFunction(num, f) {
        this.funcs[num].f = f;
    }

    changeA(num, value) {
        this.funcs[num].a = value - 0;
    }

    changeB(num, value) {
        this.funcs[num].b = value - 0;
    }

    switchDerivativeCheckBox(num) {
        this.funcs[num].showDerivative = !this.funcs[num].showDerivative;
    }

    switchIntegralCheckBox(num) {
        this.funcs[num].showIntegral = !this.funcs[num].showIntegral;
    }

    delFunction(num) {
        this.funcs[num] = null;
    }

    createObjectFunc(num) {
        this.funcs[num] = {
            f: null,
            color: 'black',
            width: 2,
            a: 0,
            b: 0,
        }
    }

}
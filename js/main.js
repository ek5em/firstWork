window.onload = () => {
    const graph2d = new Graph2d();

    new UI({
        changeColor,
        changeWidth,
        changeA,
        changeB,
        switchCheckBox,
        addFunction,
        delFunction,
        createObjectFunc,
    });

    function changeWidth(num, width) {
        graph2d.funcs[num].width = width;
    }

    function changeColor(num, color) {
        graph2d.funcs[num].color = color;
    }

    function addFunction(num, f) {
        graph2d.funcs[num].f = f;
    }

    function changeA(num, value) {
        graph2d.funcs[num].a = value - 0;
    }

    function changeB(num, value) {
        graph2d.funcs[num].b = value - 0;
    }

    function switchCheckBox(num) {
        graph2d.funcs[num].derivative = !graph2d.funcs[num].derivative;
    }

    function delFunction(num) {
        graph2d.funcs[num] = null;
    }

    function createObjectFunc(num) {
        graph2d.funcs[num] = {
            f: null,
            color: 'black',
            width: 2,
            a: 0,
            b: 0,
        }
    }

    function getZero(f, a, b, eps = 0.0001) {
        if (f(a) * f(b) > 0) return null;
        if (f(a) === 0) return a;
        if (f(b) === 0) return b;
        if (Math.abs(f(b) - f(a) <= eps)) return (a + b) / 2;
        const half = (a + b) / 2;
        if (f(a) * f(half) <= 0) return getZero(f, a, half, eps)
        if (f(b) * f(half) <= 0) return getZero(f, half, b, eps)
        else return null;
    }

}

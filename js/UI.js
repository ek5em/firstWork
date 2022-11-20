class UI {
    constructor({
        changeColor,
        changeWidth,
        changeA,
        changeB,
        switchCheckBox,
        addFunction,
        delFunction,
        createObjectFunc
    }) {
        this.addFunction = addFunction;
        this.delFunction = delFunction;
        this.changeWidth = changeWidth;
        this.changeColor = changeColor;
        this.changeA = changeA;
        this.changeB = changeB;
        this.switchCheckBox = switchCheckBox;
        this.createObjectFunc = createObjectFunc;

        this.num = 0;
        document.querySelector('.addFunction').addEventListener('click', () => this.addFunctionHandler());
        document.querySelector('.menu-button').addEventListener('click', function (event) {
            document.querySelector('.container').classList.toggle('active-container')
        });
    }


    addFunctionHandler() {

        const inputFunc = this.createInput(this.keyUpFunctionHandler, 'f(x)');

        const inputWidth = this.createInput(this.keyUpWidthHandler, 'Ширина');

        const inputColor = this.createInput(this.keyUpColorHandler, 'Цвет');

        const inputA = this.createInput(this.keyUpAHandler, 'a');

        const inputB = this.createInput(this.keyUpBHandler, 'b');

        const button = document.createElement('div');
        button.innerHTML = '&#10006';
        button.dataset.num = this.num;
        button.addEventListener('click', () => {
            div.removeChild(funcBlock);
            this.delFunction(button.dataset.num);
        })
        button.className = 'deleteFunc';

        const checkDerivative = document.createElement('input');
        checkDerivative.setAttribute('type', 'checkbox');
        checkDerivative.dataset.num = this.num;
        checkDerivative.addEventListener('click', (event) => this.switchCheckBoxHandler(event))

        const funcBlock = document.createElement('div');
        funcBlock.className = 'funcBlock';
        funcBlock.appendChild(checkDerivative);
        funcBlock.appendChild(inputFunc);
        funcBlock.appendChild(inputWidth);
        funcBlock.appendChild(inputColor);
        funcBlock.appendChild(inputA);
        funcBlock.appendChild(inputB);
        funcBlock.appendChild(button);

        const div = document.querySelector('.funcs-сontainer');

        div.appendChild(funcBlock);

        this.createObjectFunc(this.num);

        this.num++;
    }

    createInput(handler, placeholder) {
        const input = document.createElement('input');
        input.dataset.num = this.num;
        input.addEventListener('keyup', (event) => handler(event));
        input.setAttribute('placeholder', placeholder);
        return input;
    }

    keyUpFunctionHandler = (event) => {
        try {
            let f;
            eval(`f = function(x) {return ${event.target.value};}`);
            this.addFunction(event.target.dataset.num, f);
        } catch (e) {
            console.log(e);
        }
    }

    keyUpWidthHandler = (event) => {
        this.changeWidth(event.target.dataset.num, event.target.value);
    }

    keyUpColorHandler = (event) => {
        this.changeColor(event.target.dataset.num, event.target.value);
    }

    keyUpAHandler = (event) => {
        this.changeA(event.target.dataset.num, event.target.value);
    }

    keyUpBHandler = (event) => {
        this.changeB(event.target.dataset.num, event.target.value);
    }

    switchCheckBoxHandler(event) {
        this.switchCheckBox(event.target.dataset.num);
    }

}
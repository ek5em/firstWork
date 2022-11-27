function shotHandler() {
    var x = document.getElementById('x').value - 0;
    var y = document.getElementById('y').value - 0;
    document.getElementById('shotResult').innerHTML = 'Результат: ' + shot(x, y, 0);
    x.value = '';
    y.value = '';
}
function shotsHandler() {
    var min = document.getElementById('min').value - 0,
        max = document.getElementById('max').value - 0,
        count = document.getElementById('shotCount').value - 0;
    document.getElementById('shotsResult').innerHTML = 'Результат: ' + shots(min, max, count, 1)
}


function rootsHandler() {
    var a = document.getElementById('a').value-0,
        b = document.getElementById('b').value-0,
        c = document.getElementById('c').value-0,
        d = document.getElementById('d').value-0,
        e = document.getElementById('e').value-0,
        roots = getRoots(
            a ? a : 0,
            b ? b : 0,
            c ? c : 0,
            d ? d : 0,
            e ? e : 0,
        );
        document.getElementById('rootsResult').innerHTML = `Уравнение ${textRootsHandler(roots[1])} = 0 ${rootsCounter(roots[0])}  ${roots[0]}`
}


function menuHandler(event) {
    var contents = document.querySelectorAll('.content-item'),
    menuItems = document.querySelectorAll('.menu-item');
    for (var i = 0; i < contents.length; i++) {
        contents[i].classList.add('hide');
        menuItems[i].classList.remove('activated')
    }
    var buttonId = event.target.dataset.button;
    document.getElementById(buttonId).classList.add('activated');

    var contentId = event.target.dataset.content;
    document.getElementById(contentId).classList.remove('hide');
}

window.onload = function () {
    var shotButton = document.getElementById('shot');
    shotButton.addEventListener('click', shotHandler);

    var rootsButton = document.getElementById('calcRoots');
    rootsButton.addEventListener('click', rootsHandler);

    var shotsClear = document.getElementById('shotsClear');
    shotsClear.addEventListener('click', clearShots);

    var shotClear = document.getElementById('shotClear');
    shotClear.addEventListener('click', clearShot);

    var shotsButton = document.getElementById('shots');
    shotsButton.addEventListener('click', shotsHandler);

    var menuButtons = document.querySelectorAll('.menu-item');
    for (var i = 0; i < menuButtons.length; i++) {
        menuButtons[i].addEventListener('click', menuHandler);
    };

    var beginButton = document.querySelector('.beginButton');
    beginButton.addEventListener('click', beginQuest);

    document.querySelector('.continueButton').addEventListener('click', continueQuest);

    new Graph2d;
}
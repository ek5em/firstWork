function checkCentre(x, y) {
    return (x === 0 && y === 0) ? 10 : 0;
};
function checkCross(x, y) {
    var a = Math.abs((Math.sqrt(5) - 1) / 2);
    return ((x >= 0 && y >= 0 && (1 / (x + a)) - a >= y) ||
        (x <= 0 && y >= 0 && -1 / (x - a) - a >= y) ||
        (x <= 0 && y <= 0 && 1 / (x - a) + a <= y) ||
        (x >= 0 && y <= 0 && -1 / (x + a) + a <= y)) ? 4 : 0;
};
function checkRhomb(x, y) {
    return (Math.abs(x) + Math.abs(y) <= 1) ? 3 : 0;
};
function checkCircle(x, y) {
    return (x * x + y * y <= 1) ? 2 : 0;
};
function checkSqr(x, y) {
    return (Math.abs(x) <= 1 && Math.abs(y) <= 1) ? 1 : 0;
}
function drawHit(x, y, targetIndex) {
    var ctx = elem[targetIndex].getContext('2d');
    width = elem[targetIndex].width;
    height = elem[targetIndex].height;
    x = width / 2 + x * 50;
    y = height / 2 - y * 50;
    ctx.fillStyle = 'red';
    if (x > width) {
        x = width - 1;
    } else if (x < 0) {
        x = 1;
    }
    if (y > height) {
        y = height -1;
    } else if (y < 0) {
        y = 1
    }
        ctx.fillRect(x - 1, y - 1, 2, 2);
}

function shot(x,y,targetIndex) {
    drawHit(x,y,targetIndex)
    return checkCentre(x, y) || checkCross(x, y) || checkRhomb(x, y) || checkCircle(x, y) || checkSqr(x, y) || 0;
}

function shots(min,max,count,targetIndex){
    var score = 0;
    for(var i=0; i < count; i++) {
        var x = Math.random() * (max-min) + min;
        var y = Math.random() * (max-min) + min;
        score+= shot(x,y,targetIndex)
    }
    return score;
}

function clearShots(){
    var el = elem[1];
    ctx = el.getContext('2d');
    ctx.clearRect(0, 0, el.width, el.height);
    drawTarget(1);
    document.getElementById('shotsResult').innerHTML = '';
}
function clearShot(){
    var el = elem[0];
    ctx = el.getContext('2d');
    ctx.clearRect(0, 0, el.width, el.height);
    drawTarget(0);
    document.getElementById('shotResult').innerHTML = '';
}




function liner(a, b) {
    if (a === 0 && b === 0) {
        return [[], [null]];
    }
    if (a === 0) {
        return [[null], [b]];
    }
    return [[-b / a], [a, b]];
}
function quadratic(a, b, c) {
    if (a === 0 && b === 0) {
        return [[null], [c]];
    }
    if (a === 0) {
        return liner(b, c);
    }
    var D = b * b - 4 * a * c;
    if (D < 0) {
        return [[null], [a, b, c]];
    }
    if (D === 0) {
        return [[-b / (2 * a)], [a, b, c]];
    }
    if (D > 0) {
        return [[(-b + Math.sqrt(D)) / (2 * a), (-b - Math.sqrt(D)) / (2 * a)], [a, b, c]];
    }
}

function qube(a, b, c, d) {
    if (a === 0 && b === 0 && c === 0) {
        return [[null], [d]];
    }
    if (a === 0 && b === 0) {
        return liner(c,d);
    }
    if (a === 0) {
        return quadratic(b, c, d);
    }

    var a1 = b / a,
        b1 = c / a,
        c1 = d / a,

        p = -a1 * a1 / 3 + b1,
        q = 2 * a1 * a1 * a1 / 27 - a1 * b1 / 3 + c1,
        D = p * p * p / 27 + q * q / 4;
    if (D < 0) {
        var alpha = Math.acos(-q / 2 * Math.pow(3 / (-p), 3 / 2));
        var result = [
            2 * Math.sqrt(-p / 3) * Math.cos(alpha / 3) - a1 / 3,
            2 * Math.sqrt(-p / 3) * Math.cos(alpha / 3 + (2 * Math.PI) / 3) - a1 / 3,
            2 * Math.sqrt(-p / 3) * Math.cos(alpha / 3 - (2 * Math.PI) / 3) - a1 / 3,
        ];
        result = roundRoots(result);
        return [result, [a, b, c, d]];
    } else {
        var A = Math.cbrt(-q / 2 + Math.sqrt(D)),
            B = Math.cbrt(-q / 2 - Math.sqrt(D)),
            result = [A + B - a1 / 3];
        result = roundRoots(result);
        return [result, [a, b, c, d]];
    }
}

function roundRoots (roots) {
    var result = roots,
    EPS = 1000000000;
    for (var i = 0; i < result.length; i++) {
        Math.round(result[i]) === Math.round(result[i] * EPS) / EPS ? result[i] = Math.round(result[i]) : result[i] = Math.round(result[i] * EPS) / EPS;
} return result
}

function almostFourth(a, b, c, d, e) {
    if (a === 0 && b === 0 && c === 0 && d === 0) {
        return [[null], [e]];
    }
    if (a === 0 && b === 0 && c === 0) {
        return liner(d, e);
    }

    if (a === 0 && b === 0) {
        return quadratic(c, d, e);
    }
    if (a === 0) {
        return qube(b, c, d, e);
    }

    var k = Math.abs(e);
    for (var i = 1, l = -1; i <= k; i++, l--) {
        if (k % i === 0 && a * i * i * i * i + b * i * i * i + c * i * i + d * i * i + e === 0) {
            var a1 = a,
                b1 = i * a1 + b,
                c1 = i * b1 + c,
                d1 = i * c1 + d,
                e1 = i * d1 + e;
            if (e1 === 0) {
                return [qube(a1, b1, c1, d1)[0].concat(i), [a, b, c, d, e]];
            }
        }
        if (k % l === 0 && a * l * l * l * l + b * l * l * l + c * l * l + d * l * l + e === 0) {
            var a1 = a,
                b1 = i * a1 + b,
                c1 = i * b1 + c,
                d1 = i * c1 + d,
                e1 = i * d1 + e;
            if (e1 === 0) {
                return [qube(a1, b1, c1, d1)[0].concat(i), [a, b, c, d, e]];
            }
        }
    }
    return [['Нет корня в целых числах, по другому я не умею (( у меня лапки.'], [a, b, c, d, e]];
}

function getRoots(a, b, c, d, e) {
    if (e) { return almostFourth(a, b, c, d, e) };
    if (d) { return qube(a, b, c, d) };
    if (c) { return quadratic(a, b, c) };
    return liner(a, b);
}

function rootsCounter(roots) {
    var len = roots.length,
        string = 'имеет ';
    if (roots[0] === null) {
        return 'не имеет действительных корней.'
    } if (len === 1) {
        return string + '1 действительный корень:'
    
    }
    if (len === 0) {
        return string + 'бесконечное множество корней (x &isin; R)'
    }
    return string + `${len} действительных корня:`
}

function textRootsHandler (coefs) {
    if (coefs[0] === null) {
        return '0x'
    }
    var len = coefs.length;
    if (len === 1) {
        return coefs[0]
    }
    var string = '',
    array =[];
    for (var i = 0; i < coefs.length; i++) {
        if (coefs[i] > 0) {
            array.push(['+', coefs[i], coefs.length - i - 1]);
        } else if (coefs[i] < 0) {
            array.push(['-', -coefs[i], coefs.length - i - 1]);
        } else {array.push([0])}
    }
    
    for (var i = 0; i < len;i++) {
        for (k = 0; k< array[i].length; k++){
            if (array[i][k] === 1 && i !== array.length-1) {
                array[i][k] = '';
            }
        }
    }

    for (var i = 0; i < len; i++) {
        if (array[i][0] === 0) {
            continue;
        }  
        if (i === len-1) {
            string += `${array[i][0]} ${array[i][1]}`;
            continue;
        }
        if (i === 0) {
            if (array[i][0] === '+') {
                string+= `${array[i][1]}x<sup>${array[i][2]}</sup> `;
                continue;
            }
            string += `-${array[i][1]}x<sup>${array[i][2]}</sup> `;
            continue;
        }
        string += `${array[i][0]} ${array[i][1]}x<sup>${array[i][2]}</sup> `;
    }
    return string;
}


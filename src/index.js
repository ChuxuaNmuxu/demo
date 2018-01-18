// import {curry} from 'lodash';

var LOG_COUNT = 1;

function log (func) {
    return function (...rest) {
        console.log(LOG_COUNT++, func.apply(func, rest))
    }
}

// var log = curry(consoleLog)

var Container = function (x) {
    this.__value = x;
}

// 省去new关键字
Container.of = function (x) {
    return new Container(x)
}

const logContainer = log(Container.of);

logContainer('a');
log(Container.of)(Container.of('b'));

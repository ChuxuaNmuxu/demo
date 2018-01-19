import {
    curry,
    isFunction
} from 'lodash';

const logInitNumber = initCount => {
    let count = initCount;
    return func => {
        if (!isFunction(func)) return console.log(count++, func);
        return function (...rest) {
            console.log(count++, func.apply(func, rest))
        }
    }
}

const log = logInitNumber(1);

const Container = function (x) {
    this.__value = x;
}

/**
 *  1. 省去new关键字
 *  a -> Container a
 * @param {*any} x 
 */
Container.of = function (x) {
    return new Container(x)
}

const logContainer = log(Container.of);

logContainer('a');
log(Container.of)(Container.of('b'));

// (a -> b) -> Container a -> Container b
Container.prototype.map = function (f) {
    return Container.of(f(this.__value))
}

log(Container.of(2).map(x => x * x))

const Maybe = x => {
    this.__value = x;
}

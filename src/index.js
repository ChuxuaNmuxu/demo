import {
    curry,
    isFunction,
    last,
    reduce
} from 'lodash';

// 打印
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


// 容器
const Container = function (x) {
    this.__value = x;
}

/**
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
// Container a 到 Container b的映射，既a -> b
Container.prototype.map = function (f) {
    return Container.of(f(this.__value))
}

log(Container.of(2).map(x => x * x))

// Functor Maybe
class Maybe {
    constructor (x) {
        this.__value = x;
    }

    static of (x) {
        return new Maybe(x)
    }

    isNothing () {
        return this.__value == null;
    }

    // 安全的映射，加了非空检查的映射
    map (f) {
        return this.isNothing() ? Maybe.of(null) : Maybe.of(f(this.__value));
    }
}

log(Maybe.of(undefined).map(x => x));

// lift： 将非functor函数转换为可以处理functor的函数
const map = curry((f, functor) => functor.map(f));

log(map(x =>x - 1)(new Maybe(5)));

// 暴露容器的值
const maybe = (x, func, MaybeFunctor) => {
    return MaybeFunctor.isNothing() ? x : f(MaybeFunctor.__value);
}


// Functor Either
class Left extends Container {
    map (f) {
        return this;
    }
}

const left = new Left(8);

log(left.map(x => x + 999));

class Right extends Container {};

const right = new Right(34);

log(right.map(x => x + 999));

// 暴露容器的值
const either = curry((l, r, eitherFunctor) => {
    switch (eitherFunctor.constructor) {
        case left:
            return l(eitherFunctor.__value);
            break;
        case right: 
            return r(eitherFunctor.__value);
            break;
        default:
            break;
    }
})

// TODO: 重构log

// TODO: 实现compose
// func -> func -> ... -> func
// const reverse = arr => [].concat(arr).reverse();
const _pipe = (f, g) => (...args) => g.call(this, f.apply(this, args));

// pipe: function a => function a
const pipe = (...args) => args.reduce(_pipe, args.shift());

// const compose = (...args) => args.reverse().reduce(_pipe, args.shift());
const compose = (...args) => pipe.apply(this, args.reverse());

log(compose(x => x * x * 3, (x, y) => x - y)(2, 3));
log(pipe(x => x * x * 3, x => x - 5)(2));

class IO {
    constructor (func) {
        this.__value = func;
    }

    // 暂时没用到
    static of (x) {  
        return new IO (() => x)
    }

    map (f) {
        return new IO(compose(f, this.__value))
    }
}



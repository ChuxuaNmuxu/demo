import {head, tail, reduce, filter, map, isArray, curry, isEmpty, concat} from 'lodash';
const {log} = console;

const existy = value => value != null;

const cat = (...args) => {
    const first = head(args);

    if (existy(first) && first.concat) {
        return first.concat.apply(first, tail(args));
    } else {
        return []
    }
}

// func -> func -> ... -> func
// const reverse = arr => [].concat(arr).reverse();
const _pipe = (f, g) => (...args) => g.call(this, f.apply(this, args));

// pipe: function a => function a
const pipe = (...args) => args.reduce(_pipe, args.shift());

// const compose = (...args) => args.reverse().reduce(_pipe, args.shift());
const compose = (...args) => pipe.apply(this, args.reverse());


const actions = (acts, done) => {
    return seed => {
        const init = {
            values: [],
            state: seed
        };

        const intermediate = reduce(acts, (stateObj, action) => {
            const {result: {answer, state}} = action(stateObj.state);
            const values = cat(stateObj.values, [answer]);

            return { 
                values,
                state
            }
        }, init);

        const keep = filter(intermediate.values, existy);

        return done(keep, intermediate.state);
    }
}

const mSqr = () => {
    return state => {
        ans = state * state;
        return {answer: ans, state: ans}
    }
}

const mult = scale => num => num * scale; 

const isNestArray = arr => reduce(arr, (res, item) => res && isArray(item), false);

const DeepMap = (arr, func) => {
    return map(arr, subArr =>  {
        if (isArray(subArr)) {
            return DeepMap(subArr, func)
        }
        return func(subArr)
    })
}

const a = [1, 2, [3, 4, [4, 5]]];
console.log(23, a, DeepMap(a, mult(3)));

const remove = (arr, item) => {
    return arr.filter(value => value !== item);
}

const allCombinations = arr => {
    return map(arr, item => {
        // 除去当前元素剩下的数组
        if (isEmpty(arr)) {
            return []
        }

        const subArr = remove(arr, item);

        return map(allCombinations(subArr), subItem => {
            return concat(item, subItem);
        })
    })
}

console.log(allCombinations([1, 2, 3]))

const unshift = curry(
    (list, x) => [x].concat(list)
)

const flip = func => (x, y) => func(y, x);

const glub = flip(unshift);

log(78, unshift([1, 2], 3));
log(79, glub(1, [3, 4]));

/**
 * 递归方式重写map
 * @param {*} param0 
 * @param {*} func 
 */
const mapRewrite =  ([x, ...subArr], func) => {
    if (isEmpty(subArr)) {
        return func(x);
    }
    glub(func(x), mapRewrite(subArr, func));
}


// log(80, map([1, 2, 3], x => x + 1)); 

/**
 * reduce 重写map
 * @param {*} arr 
 * @param {*} func 
 */
const mapRewrite2 = (arr, func) => reduce(arr, (accu, item) => cat(accu, func(item)), []);

/**
 * 期望简化reduce的匿名函数为free point风格，发现reduce先传入acc和item算累加值在继续带入下一次计算，和haskell递归到最后一步才算累加值是相反的过程
 * @param {*} func 
 * @param {*} acc 
 * @param {*} arr 
 */
const reduceRe = (func, acc, arr) => reduce(arr, func, acc);
const flodr = curry(reduceRe);

const mapRe = func => flodr((acc, item) => glub(func(item), acc), []);
// const mapRe2 = func => flodr((acc, item) => compose(unshift(acc), func(item)), []);

/**
 * test reduce
 * 测试只有函数接受两个参数acc和item时才能直接带入reduce
 */
const add = curry(
    (x, y) => x + y
)
const mapAdd = flodr(add, 0);
log(81, mapAdd([1, 2, 3]));

/*
* 递归重实现reduce
*/
const foldr2 = (func, acc, arr) => {
    if (isEmpty(arr)) {
        return acc;
    }

    const [x, ...subArr] = arr;

    return func(x)(foldr2(func, acc, subArr));
}

log(92, foldr2(add, 0, [1, 2, 3]));

//再实现map
const fold = curry(foldr2);
const mapRe3 = func => fold(compose(curry(glub), func), []);

log(93, mapRe3(x => x + 1)([1, 2, 3]));

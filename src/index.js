import {head, tail, reduce, filter, map, isArray, curry, isEmpty, concat} from 'lodash';

const existy = value => value != null;

const cat = (...args) => {
    const first = head(args);

    if (existy(first) && first.concat) {
        return first.concat.apply(first, tail(args));
    } else {
        return []
    }
}

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

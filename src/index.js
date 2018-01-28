import {head, tail, reduce, filter} from 'lodash';

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



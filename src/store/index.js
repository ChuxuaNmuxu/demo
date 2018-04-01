import {createStore} from 'redux';
import reducers from '../reducers';

const create = initialState => {
    return createStore(reducers, initialState);
}

export default create;

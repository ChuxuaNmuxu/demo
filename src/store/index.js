import {createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';
import thunk from 'redux-thunk';

const create = initialState => {
    return createStore(
        reducers,
        initialState,
        applyMiddleware(thunk)
    );
}

export default create;

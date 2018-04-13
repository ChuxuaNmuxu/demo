import homeReducers from './home';
import dataReducers from './fetchData';
import { combineReducers } from 'redux';

const reducer = combineReducers({
    homeReducers,
    dataReducers
})

export default reducer;

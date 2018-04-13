import * as constant from '../actionType';
import initialState from '../initialState';

// const initialData = {
//     data: {},
//     loading: false,
//     error: null
// }
  
const dataReducers = (state = initialState, action) => {
    switch(action.type) {
        case constant.START_FETCH:
        return {
            ...state,
            loading: true,
            error: null
        }
        case constant.FETCH_SUCCESS:
        return {
            ...state,
            loading: false,
            fetchData: action.payload
        }
        case constant.FETCH_FAILED:
        return {
            ...state,
            loading: false,
            error: action.error
        }
        default:
        return state
    }
}

export default dataReducers;

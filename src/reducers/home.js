import * as constant from '../actionType';
import initialState from '../initialState';

const homeReducers = (state=initialState, action) => {
    switch (action.type) {
        case constant.ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...state.todos,
                    {
                        text: action.data.text,
                        completed: action.data.completed
                    }
                ]
            })
            break;
        case constant.GET_TEST_DATA:
            return Object.assign({}, state, {
                testData: action.data
            })
        default:
            return state;
    }
}

export default homeReducers;

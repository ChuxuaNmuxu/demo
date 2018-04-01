import * as constant from '../actionType';
import initialState from '../initialState';

const reducers = (state=initialState, action) => {
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
        default:
            return state;
    }
}

export default reducers;

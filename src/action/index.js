import * as actionType from '../actionType';

export const addTodo = data => {
    return {
        type: actionType.ADD_TODO,
        data
    }
}

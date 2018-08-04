const createReducer = (initialState, actionHandlers) =>
    (state = initialState, action) =>
        actionHandlers.hasOwnProperty(action.type) ?
            actionHandlers[action.type](state, action) :
            state;

export default createReducer;

const createReducer = (initialState, actionHandlers) => (state = initialState, action) =>
    Object.prototype.hasOwnProperty.call(actionHandlers, action.type)
        ? actionHandlers[action.type](state, action)
        : state;

export default createReducer;

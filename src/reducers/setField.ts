import type { Reducer } from 'react';

interface ActionType {
    type: string;
    payload: unknown;
}

export const setField =
    <State, Action extends ActionType>(name: string): Reducer<State, Action> =>
    (state: State, { payload }: Action) => ({ ...state, [name]: payload });

import { createReducer } from 'deox';
import { Reihung } from 'types/reihung';
import Actions from 'Abfahrten/actions/reihung';

export type State = {
  reihung: { [key: string]: null | Reihung };
};

const defaultState: State = {
  reihung: {},
};

export default createReducer(defaultState, handle => [
  handle(Actions.gotReihung, (state, { payload }) => ({
    ...state,
    reihung: {
      ...state.reihung,
      [payload.id]: payload.data,
    },
  })),
]);

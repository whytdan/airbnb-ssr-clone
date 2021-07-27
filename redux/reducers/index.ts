import { combineReducers } from 'redux';
import homesReducer from './homes';

export const rootReducer = combineReducers({
  homes: homesReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

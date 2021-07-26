import { combineReducers } from 'redux';
import homesReducer from './homes';

export default combineReducers({
  homes: homesReducer,
});

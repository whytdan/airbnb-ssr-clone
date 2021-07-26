import { CLEAR_HOMES } from '../../contexts/constants';
import {
  FETCH_HOMES_ERROR,
  FETCH_HOMES_LOADING,
  FETCH_HOMES_SUCCESS,
  SET_PRELOADED_HOMES,
} from '../actions/actionTypes';

const INIT_STATE = {
  homes: [],
  error: null,
  loading: false,
  hasMore: true,
};

export default function homesReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case SET_PRELOADED_HOMES:
      return {
        ...state,
        homes: action.payload,
      };
    case FETCH_HOMES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        homes: [...state.homes, ...action.payload],
        hasMore: action.payload.length > 0,
      };
    case FETCH_HOMES_ERROR:
      return {
        ...state,
        homes: [],
        loading: false,
        error: action.payload,
      };
    case FETCH_HOMES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CLEAR_HOMES:
      return {
        homes: [],
        error: null,
        loading: false,
        hasMore: true,
      };
    default:
      return state;
  }
}

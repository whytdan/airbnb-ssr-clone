import axios from 'axios';
import { CLEAR_HOMES } from '../../contexts/constants';
import CONFIG from '../../dev.config.json';
import {
  FETCH_HOMES_ERROR,
  FETCH_HOMES_LOADING,
  FETCH_HOMES_SUCCESS,
  SET_PRELOADED_HOMES,
} from './actionTypes';

const fetchHomesSuccess = (homes) => {
  return {
    type: FETCH_HOMES_SUCCESS,
    payload: homes,
  };
};

const fetchHomesError = (error) => {
  return {
    type: FETCH_HOMES_ERROR,
    payload: error,
  };
};

const fetchHomesLoading = () => {
  return {
    type: FETCH_HOMES_LOADING,
  };
};

const CancelToken = axios.CancelToken;
let cancel;

export const fetchHomes = (query, pageNumber = 1) => {
  return async (dispatch) => {
    dispatch(fetchHomesLoading());
    try {
      const apiUrl = `${CONFIG.API_URL}/homes`;
      cancel && cancel();
      const res = await axios.get(apiUrl, {
        params: {
          ['_page']: pageNumber,
          ['_limit']: 5,
          ['categories_like']: query.slug,
          ...query,
          ['slug']: '',
        },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }),
      });
      dispatch(fetchHomesSuccess(res.data));
      cancel();
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('axios cancel operation');
      } else {
        dispatch(fetchHomesError(error));
        console.log(error);
      }
    }
  };
};

export const clearHomes = () => ({
  type: CLEAR_HOMES,
});

export const setPreloadedHomes = (payload) => ({
  type: SET_PRELOADED_HOMES,
  payload,
});

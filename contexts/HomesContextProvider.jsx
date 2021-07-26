import axios from 'axios';
import React, { useReducer } from 'react';
import {
  CLEAR_HOMES,
  SET_HOMES_ERROR,
  SET_HOMES_HAS_MORE,
  SET_HOMES_LOADING,
  SET_HOMES_SUCCESS,
} from './constants';
import CONFIG from '../dev.config.json';

const INIT_STATE = {
  homes: [],
  error: null,
  loading: false,
  hasMore: true,
  limit: 5,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_HOMES_SUCCESS: {
      return {
        ...state,
        loading: false,
        error: null,
        homes: [...state.homes, ...action.payload],
      };
    }
    case SET_HOMES_HAS_MORE:
      return {
        ...state,
        hasMore: action.payload,
      };
    case SET_HOMES_ERROR:
      return {
        ...state,
        homes: [],
        loading: false,
        error: action.payload,
      };
    case SET_HOMES_LOADING:
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
        limit: 5,
      };
    default:
      return state;
  }
};

export const homesContext = React.createContext();

const CancelToken = axios.CancelToken;
let cancel;

function HomesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const setHomesLoading = () => dispatch({ type: SET_HOMES_LOADING });

  const setHomesError = (payload) =>
    dispatch({ type: SET_HOMES_ERROR, payload });

  const setHomesSuccess = (payload) =>
    dispatch({ type: SET_HOMES_SUCCESS, payload });

  const setHomesHasMore = (payload) =>
    dispatch({ type: SET_HOMES_HAS_MORE, payload });

  const clearHomes = () => dispatch({ type: CLEAR_HOMES });

  const setPreloadedHomes = (homes) => setHomesSuccess(homes);

  const fetchHomesByCategory = async (query, pageNumber = 1) => {
    setHomesLoading();
    try {
      const apiQuery = `${CONFIG.API_URL}/homes`;
      cancel && cancel();
      const res = await axios.get(apiQuery, {
        params: {
          ['_page']: pageNumber,
          ['_limit']: state.limit,
          ['categories_like']: query.slug,
          ...query,
          ['slug']: '',
        },
        cancelToken: new CancelToken(function executor(c) {
          // An executor function receives a cancel function as a parameter
          cancel = c;
        }),
      });
      setHomesSuccess(res.data);
      setHomesHasMore(res.data.length > 0);
      cancel();
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('axios cancel operation');
      } else {
        setHomesError(error);
        console.log(error);
      }
    }
  };

  return (
    <homesContext.Provider
      value={{
        loading: state.loading,
        error: state.error,
        homes: state.homes,
        hasMore: state.hasMore,
        filterParams: state.filterParams,
        fetchHomesByCategory,
        setPreloadedHomes,
        setHomesSuccess,
        clearHomes,
      }}
    >
      {children}
    </homesContext.Provider>
  );
}

export default HomesContextProvider;

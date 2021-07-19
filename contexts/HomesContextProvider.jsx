import axios from 'axios';
import React, { useReducer } from 'react';

const INIT_STATE = {
  homes: [],
  error: null,
  loading: false,
  hasMore: true,
  filterParams: {
    flexibleCancellation: '',
    housingType: '',
    minPrice: 0,
    maxPrice: 50000,
    instanceBooking: '',
  },
  limit: 5,
};

const reducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case 'SET_HOMES_SUCCESS': {
      return {
        ...state,
        loading: false,
        error: null,
        homes: [...state.homes, ...action.payload],
      };
    }
    case 'SET_HOMES_HAS_MORE':
      return {
        ...state,
        hasMore: action.payload,
      };
    case 'SET_HOMES_ERROR':
      return {
        ...state,
        homes: [],
        loading: false,
        error: action.payload,
      };
    case 'SET_HOMES_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SET_HOMES_FILTER_PARAMS':
      return {
        ...state,
        homes: [],
        filterParams: action.payload,
      };
    case 'CLEAR_HOMES':
      return {
        ...INIT_STATE,
      };
    default:
      return state;
  }
};

export const homesContext = React.createContext();
const API = process.env.NEXT_PUBLIC_API_URL;

function HomesContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const setHomesLoading = () => dispatch({ type: 'SET_HOMES_LOADING' });

  const setHomesError = (payload) =>
    dispatch({ type: 'SET_HOMES_ERROR', payload });

  const setHomesSuccess = (payload) =>
    dispatch({ type: 'SET_HOMES_SUCCESS', payload });

  const setHomesHasMore = (payload) =>
    dispatch({ type: 'SET_HOMES_HAS_MORE', payload });
  const clearHomes = () => dispatch({ type: 'CLEAR_HOMES' });

  const setHomesFilterParams = (filterParam) => {
    dispatch({
      type: 'SET_HOMES_FILTER_PARAMS',
      payload: {
        ...state.filterParams,
        ...filterParam,
      },
    });
  };

  const setPreloadedHomes = (homes) => setHomesSuccess(homes);

  const fetchHomesByCategory = async (slug, pageNumber = 1) => {
    setHomesLoading();
    try {
      const housingTypeQuery = state.filterParams.housingType
        ? Object.entries(state.filterParams.housingType).reduce(
            (a, [key, value]) => {
              return a + (value ? `housingType_like=${key}&` : '');
            },
            ''
          )
        : '';
      const query = `${API}/homes?${housingTypeQuery}`;
      const res = await axios.get(query, {
        params: {
          ['_page']: pageNumber,
          ['_limit']: state.limit,
          ['categories_like']: slug,
          ['flexibleCancellation_like']:
            state.filterParams.flexibleCancellation,
          ['instanceBooking_like']: state.filterParams.instanceBooking,
          ['price_gte']: state.filterParams.minPrice,
          ['price_lte']: state.filterParams.maxPrice,
        },
      });
      setHomesSuccess(res.data);
      setHomesHasMore(res.data.length > 0);
    } catch (error) {
      console.log(error);
      setHomesError(error);
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
        clearHomes,
        setHomesFilterParams,
      }}
    >
      {children}
    </homesContext.Provider>
  );
}

export default HomesContextProvider;

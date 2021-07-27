import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import '../styles/globals.css';
import { rootReducer } from '../redux/reducers';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

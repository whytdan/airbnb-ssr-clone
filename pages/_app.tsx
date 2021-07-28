import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import '../styles/globals.css';
import { rootReducer } from '../redux/reducers';
import type { AppProps /*, AppContext */ } from 'next/app';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

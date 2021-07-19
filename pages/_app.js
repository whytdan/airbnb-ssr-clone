import React from 'react';
import HomesContextProvider from '../contexts/HomesContextProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <HomesContextProvider>
      <Component {...pageProps} />
    </HomesContextProvider>
  );
}

export default MyApp;

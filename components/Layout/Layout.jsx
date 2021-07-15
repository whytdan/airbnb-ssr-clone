import React from 'react';
import Head from 'next/head';
import Nav from './Nav';
import classes from './Layout.module.scss';

export default function Layout({ children, home }) {
  return (
    <>
      <Nav home />
      <div className={classes.underNav} />
      <main>{children}</main>
    </>
  );
}

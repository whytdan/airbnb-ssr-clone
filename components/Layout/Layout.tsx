import React from 'react';
import Head from 'next/head';
import Nav from './Nav';
import classes from './Layout.module.scss';

export const siteTitle =
  'Airbnb: жилье для отпуска, домики, дома на пляже, уникальные объекты и Впечатления';

export default function Layout({ children, home }) {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Nav home={home} />
      <div className={classes.underNav} />
      <main>{children}</main>
    </>
  );
}

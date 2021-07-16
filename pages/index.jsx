import Head from 'next/head';
import Image from 'next/image';
import HomeCategories from '../components/HomeCategories';
import Layout from '../components/Layout';
import { siteTitle } from '../components/Layout/Layout';
import classes from '../styles/home.module.scss';

export default function Home() {
  return (
    <Layout home>
      <section className={classes.hero}></section>
      <HomeCategories />
    </Layout>
  );
}

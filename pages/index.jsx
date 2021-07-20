import Head from 'next/head';
import Image from 'next/image';
import { fetchHomeCategories } from '../api/categories';
import HomeCategories from '../components/HomeCategories';
import Layout from '../components/Layout';
import { siteTitle } from '../components/Layout/Layout';
import classes from '../styles/home.module.scss';

export async function getStaticProps() {
  const categories = await fetchHomeCategories();
  return {
    props: {
      categories,
    },
  };
}

export default function Home({ categories }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={classes.hero}></section>
      <HomeCategories categories={categories} />
    </Layout>
  );
}

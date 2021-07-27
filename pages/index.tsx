import Head from 'next/head';
import { fetchHomeCategories } from '../api/categories';
import { ICategoryObject } from '../api/interfaces';
import HomeCategories from '../components/HomeCategories';
import Layout from '../components/Layout';
import { siteTitle } from '../components/Layout/Layout';
import classes from '../styles/home.module.scss';

export async function getStaticProps() {
  const categories: ICategoryObject[] = await fetchHomeCategories();
  return {
    props: {
      categories,
    },
  };
}

interface HomeProps {
  categories: ICategoryObject[];
}

export default function Home({ categories }: HomeProps) {
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

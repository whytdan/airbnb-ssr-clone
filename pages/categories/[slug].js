import Head from 'next/head';
import React from 'react';
import { getCategoryTitle } from '../../api/categories';
import { fetchHomesByCategory } from '../../api/homes';
import Layout from '../../components/Layout';

export async function getServerSideProps({ params }) {
  const homes = await fetchHomesByCategory(params.slug);
  const categoryTitle = await getCategoryTitle(params.slug);
  return {
    props: {
      homes,
      categoryTitle,
    },
  };
}

export default function CategoryHomes({ homes, categoryTitle }) {
  return (
    <Layout>
      <Head>
        <title>Везде - Жилье - Airbnb</title>
      </Head>
      <></>
    </Layout>
  );
}

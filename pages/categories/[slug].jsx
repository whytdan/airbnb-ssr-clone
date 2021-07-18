import React, { useRef, useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { getCategoryTitle } from '../../api/categories';
import { fetchHomesByCategory } from '../../api/homes';
import HomeList from '../../components/HomeList/HomeList';
import Layout from '../../components/Layout';
import classes from '../../styles/houses.module.scss';
import utilsClasses from '../../styles/utils.module.scss';
import useFetchCategoryHomes from '../../hooks/useFetchCategoryHomes';

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

export default function CategoryHomes({
  homes: preloadedHomes,
  categoryTitle,
}) {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    query: { slug },
  } = useRouter();

  const { loading, error, homes, hasMore } = useFetchCategoryHomes(
    slug,
    pageNumber,
    preloadedHomes
  );

  const observer = useRef();
  const lastHomeElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <Layout>
      <Head>
        <title>Везде - Жилье - Airbnb</title>
      </Head>
      <section
        className={[utilsClasses.container, classes.contentWrapper].join(' ')}
      >
        <div className={classes.leftContent}>
          <section className={classes.headingWrapper}>
            <p>{homes.length} вариант жилья</p>
            <h1>{categoryTitle}</h1>
          </section>
          <HomeList
            homes={homes}
            loading={loading}
            error={error}
            lastHomeElementRef={lastHomeElementRef}
          />
        </div>
      </section>
    </Layout>
  );
}

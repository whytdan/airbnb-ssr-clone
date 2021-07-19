import React, { useRef, useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { getCategoryTitle } from '../../api/categories';
import { fetchHomesByCategory } from '../../api/homes';
import HomeList from '../../components/HomeList/HomeList';
import Layout from '../../components/Layout';
import classes from '../../styles/houses.module.scss';
import utilsClasses from '../../styles/utils.module.scss';
import FiltrationArea from '../../components/FiltrationArea/FiltrationArea';
import { useContext } from 'react';
import { homesContext } from '../../contexts/HomesContextProvider';
import HomesMap from '../../components/HomesMap/HomesMap';

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

  const mounted = useRef();

  const {
    loading,
    error,
    homes,
    hasMore,
    filterParams,
    fetchHomesByCategory,
    setPreloadedHomes,
    clearHomes,
  } = useContext(homesContext);

  useEffect(() => {
    if (!mounted.current) {
      // do componentDidMount logic
      setPreloadedHomes(preloadedHomes);
    } else {
      // do componentDidUpdate logic
      fetchHomesByCategory(slug, pageNumber);
    }
  }, [pageNumber, filterParams]);

  useEffect(() => {
    return () => clearHomes();
  }, []);

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
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
          integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
          crossorigin=""
        />

        <script
          src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
          integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
          crossorigin=""
        ></script>

        <title>Везде - Жилье - Airbnb</title>
      </Head>
      <section
        ref={mounted}
        className={[utilsClasses.container, classes.contentWrapper].join(' ')}
      >
        <div className={classes.leftContent}>
          <section className={classes.headingWrapper}>
            <p>{homes.length} вариант жилья</p>
            <h1>{categoryTitle}</h1>
          </section>

          <FiltrationArea setPageNumber={setPageNumber} />
          <HomeList
            homes={homes}
            loading={loading}
            error={error}
            lastHomeElementRef={lastHomeElementRef}
          />
        </div>

        <div className={classes.rightContent}>
          <HomesMap homes={homes} />
        </div>
      </section>
    </Layout>
  );
}

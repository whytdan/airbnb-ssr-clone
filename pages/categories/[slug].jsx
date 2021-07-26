import React, { useRef, useEffect, useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { useSelector, useDispatch } from 'react-redux';
import { getCategoryTitle } from '../../api/categories';
import { fetchHomesByCategory } from '../../api/homes';
import HomeList from '../../components/HomeList/HomeList';
import Layout from '../../components/Layout';
import classes from '../../styles/houses.module.scss';
import utilsClasses from '../../styles/utils.module.scss';
import FiltrationArea from '../../components/FiltrationArea/FiltrationArea';
import HomesMap from '../../components/HomesMap';
import {
  clearHomes,
  fetchHomes,
  setPreloadedHomes,
} from '../../redux/actions/homes';

export async function getServerSideProps(ctx) {
  const homes = await fetchHomesByCategory(ctx.query);
  const categoryTitle = await getCategoryTitle(ctx.params.slug);

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
  const { query } = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const [prevQueryObjectLink, setPrevQueryObjectLink] = useState(query);

  const dispatch = useDispatch();
  const { loading, error, homes, hasMore } = useSelector(
    (state) => state.homes
  );

  useEffect(async () => {
    if (isFirstRender) {
      dispatch(setPreloadedHomes(preloadedHomes));
      setIsFirstRender(false);
      console.log('preloaded');
    } else {
      if (query !== prevQueryObjectLink) {
        console.log('fetch 1st filter page!');
        await setPrevQueryObjectLink(query);
        await setPageNumber(1);
        await dispatch(clearHomes());
        dispatch(fetchHomes(query));
        return;
      }
      if (pageNumber !== 1) {
        console.log('fetch');
        dispatch(fetchHomes(query, pageNumber));
      }
    }
  }, [pageNumber, query]);

  useEffect(() => {
    return () => dispatch(clearHomes());
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
        <title>Везде - Жилье - Airbnb</title>
      </Head>
      <section
        className={[utilsClasses.container, classes.contentWrapper].join(' ')}
      >
        <div className={classes.leftContent}>
          <section className={classes.headingWrapper}>
            <p>
              {isFirstRender ? preloadedHomes.length : homes.length} вариант
              жилья
            </p>
            <h1>{categoryTitle}</h1>
          </section>

          <FiltrationArea />

          <HomeList
            homes={isFirstRender ? preloadedHomes : homes}
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

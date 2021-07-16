import axios from 'axios';
import Image from 'next/image';
import React from 'react';
import useSWR from 'swr';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import homeClasses from '../../styles/home.module.scss';
import classes from './HomeCategories.module.scss';
import { sliderSettings } from './configs';

const fetchHomeCategories = async (url) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return error;
  }
};

export default function HomeCategories() {
  const { data } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    fetchHomeCategories
  );

  return (
    <div className={[classes.container, homeClasses.container].join(' ')}>
      <h2>Живите где угодно</h2>
      {data ? (
        <ul className={classes.wrapper}>
          <Slider {...sliderSettings} className={classes.slider}>
            {data.map((category) => (
              <li className={classes.card} key={category.id}>
                <Link href={`/categories/${category.slug}`}>
                  <a>
                    <Image
                      src={category.image}
                      width={386}
                      height={386}
                      alt={category.title}
                    />
                    <p>{category.title}</p>
                  </a>
                </Link>
              </li>
            ))}
          </Slider>
        </ul>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

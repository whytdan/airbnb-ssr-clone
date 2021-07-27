import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import homeClasses from '../../styles/home.module.scss';
import classes from './HomeCategories.module.scss';
import { sliderSettings } from './configs';
import { ICategoryObject } from '../../api/interfaces';

interface HomeCategoriesProps {
  categories: ICategoryObject[];
}

export default function HomeCategories({ categories }: HomeCategoriesProps) {
  return (
    <div className={[classes.container, homeClasses.container].join(' ')}>
      <h2>Живите где угодно</h2>
      <ul className={classes.wrapper}>
        <Slider {...sliderSettings} className={classes.slider}>
          {categories.map((category) => (
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
    </div>
  );
}

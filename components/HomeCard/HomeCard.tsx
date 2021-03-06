import Image from 'next/image';
import React, { ForwardedRef } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import classes from './HomeCard.module.scss';
import { IHomeObject } from '../../api/interfaces';

interface HomeCardProps {
  data: IHomeObject;
}

function HomeCard({ data }: HomeCardProps, ref: ForwardedRef<HTMLDivElement>) {
  return (
    <div className={classes.card} ref={ref}>
      <hr className={classes.colorDivider} />
      <div className={classes.cardContent}>
        <Slider className={classes.slider}>
          {data.images.map((imageSrc, index) => (
            <Image
              key={index}
              src={imageSrc}
              width={300}
              height={200}
              objectFit="cover"
              alt={data.title}
            />
          ))}
        </Slider>
        <div className={classes.cardRightContent}>
          <div className={classes.cardTxt}>
            <p>{data.secondaryTitle}</p>
            <h3>{data.title}</h3>
            <hr />
            <p className={classes.capacity}>{data.capacity}</p>
            <p className={classes.price}>
              <span>{data.price}₽</span> / ночь
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.forwardRef(HomeCard);

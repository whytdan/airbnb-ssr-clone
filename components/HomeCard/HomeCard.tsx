import Image from 'next/image';
import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import classes from './HomeCard.module.scss';

function HomeCard({ data }, ref) {
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

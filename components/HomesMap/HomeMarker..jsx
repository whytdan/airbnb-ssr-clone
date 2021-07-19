import React from 'react';
import classes from './HomesMap.module.scss';

export default function HomeMarker({ home }) {
  return (
    <div className={classes.marker}>
      <p>
        {home.price}
        <span>₽</span>
      </p>
    </div>
  );
}

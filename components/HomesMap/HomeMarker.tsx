import React from 'react';
import { IHomeObject } from '../../api/interfaces';
import classes from './HomesMap.module.scss';

interface IHomeMarkerProps {
  lat: number;
  lng: number;
  home: IHomeObject;
}

export default function HomeMarker({ home }: IHomeMarkerProps) {
  return (
    <div className={classes.marker}>
      <p>
        {home.price}
        <span>₽</span>
      </p>
    </div>
  );
}

import React from 'react';
import GoogleMapReact from 'google-map-react';
import HomeMarker from './HomeMarker';
import classes from './HomesMap.module.scss';
import { IHomeObject } from '../../api/interfaces';

interface HomesMapProps {
  homes: IHomeObject[];
}

export default function HomesMap({ homes }: HomesMapProps) {
  const defaultProps = {
    center: {
      lat: 42.293564,
      lng: 75.146484,
    },
    zoom: 7,
  };

  return (
    <div className={classes.map}>
      <GoogleMapReact
        yesIWantToUseGoogleMapApiInternals
        bootstrapURLKeys={{ key: '' }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {homes.map((home) => (
          <HomeMarker
            key={home.id}
            lat={home.position[0]}
            lng={home.position[1]}
            home={home}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}

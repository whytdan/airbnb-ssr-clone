import React from 'react';
import classes from './FiltrationArea.module.scss';

export default function FilterButton({
  label,
  handleFilterPopupOpen,
  isActive,
}) {
  return (
    <div
      className={[classes.filter, isActive ? classes.active : ''].join(' ')}
      onClick={handleFilterPopupOpen}
    >
      {label}
    </div>
  );
}

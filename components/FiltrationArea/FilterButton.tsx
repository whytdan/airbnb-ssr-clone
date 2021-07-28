import React from 'react';
import { MouseEventHandler } from 'react';
import classes from './FiltrationArea.module.scss';

interface FilterButtonProps {
  label: string;
  handleFilterPopupOpen: MouseEventHandler;
  isActive: boolean;
}

export default function FilterButton({
  label,
  handleFilterPopupOpen,
  isActive,
}: FilterButtonProps) {
  return (
    <div
      className={[classes.filter, isActive ? classes.active : ''].join(' ')}
      onClick={handleFilterPopupOpen}
    >
      {label}
    </div>
  );
}

import React from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import classes from './FiltrationArea.module.scss';

function InstanceBookingPopup({ handleChange, value, reset }, ref) {
  return (
    <div
      ref={ref}
      className={[classes.filterArea, classes.instanceBooking].join(' ')}
    >
      <div className={classes.filterControl}>
        <p>
          Объявления, которые можно забронировать, не дожидаясь подтверждения
          хозяина.
        </p>
        <Switch onChange={handleChange} checked={value} color="secondary" />
      </div>
      <Button
        onClick={handleChange}
        disabled={!value}
        className={classes.clearBtn}
      >
        Очистить
      </Button>
    </div>
  );
}

export default React.forwardRef(InstanceBookingPopup);

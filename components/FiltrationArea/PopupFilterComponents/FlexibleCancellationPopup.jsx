import React from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import classes from '../FiltrationArea.module.scss';

function FlexibleCancellationPopup({ value, handleChange }, ref) {
  return (
    <div
      ref={ref}
      className={[classes.filterArea, classes.flexibleCancellation].join(' ')}
    >
      <div className={classes.filterControl}>
        <p>Показывать только жилье с гибкими правилами отмены</p>
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

export default React.forwardRef(FlexibleCancellationPopup);

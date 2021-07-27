import React, { useState } from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import classes from '../../FiltrationArea.module.scss';
import { useRouter } from 'next/router';

function InstanceBookingPopup({ coreState }, ref) {
  const { setFiltersTouched, filtersTouched, query, setQuery } = coreState;

  const router = useRouter();
  const [checked, setCheked] = useState(
    router.query.instanceBooking
      ? // @ts-ignore
        JSON.parse(router.query.instanceBooking)
      : false
  );

  const handleChange = () => {
    const nextCheckedValue = !checked;
    setCheked(nextCheckedValue);

    setFiltersTouched({
      ...filtersTouched,
      instanceBooking: nextCheckedValue,
    });

    if (nextCheckedValue) {
      setQuery([
        ...query,
        {
          name: 'instanceBooking',
          value: !!nextCheckedValue,
        },
      ]);
    } else {
      setQuery(
        query.filter((queryParam) => queryParam.name !== 'instanceBooking')
      );
    }
  };

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
        <Switch onChange={handleChange} checked={checked} color="secondary" />
      </div>
      <Button
        onClick={handleChange}
        disabled={!checked}
        className={classes.clearBtn}
      >
        Очистить
      </Button>
    </div>
  );
}

export default React.forwardRef(InstanceBookingPopup);

import React, { ForwardedRef, useState } from 'react';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';
import classes from '../../FiltrationArea.module.scss';
import { useRouter } from 'next/router';
import { FilterPopupProps } from '../../interfaces';

function convertToBoolean(input: string): boolean {
  try {
    return JSON.parse(input);
  } catch (e) {
    return false;
  }
}

function FlexibleCancellationPopup(
  { coreState }: FilterPopupProps,
  ref: ForwardedRef<HTMLDivElement>
) {
  const { setFiltersTouched, filtersTouched, query, setQuery } = coreState;

  const router = useRouter();
  const [checked, setCheked] = useState<boolean>(
    router.query.flexibleCancellation
      ? // @ts-ignore
        convertToBoolean(router.query.flexibleCancellation)
      : false
  );

  const handleChange = () => {
    const nextCheckedValue = !checked;
    setCheked(nextCheckedValue);

    setFiltersTouched({
      ...filtersTouched,
      flexibleCancellation: nextCheckedValue,
    });

    if (nextCheckedValue) {
      setQuery([
        ...query,
        {
          name: 'flexibleCancellation',
          value: !!nextCheckedValue,
        },
      ]);
    } else {
      setQuery(
        query.filter((queryParam) => queryParam.name !== 'flexibleCancellation')
      );
    }
  };

  return (
    <div
      ref={ref}
      className={[classes.filterArea, classes.flexibleCancellation].join(' ')}
    >
      <div className={classes.filterControl}>
        <p>Показывать только жилье с гибкими правилами отмены</p>
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

export default React.forwardRef(FlexibleCancellationPopup);

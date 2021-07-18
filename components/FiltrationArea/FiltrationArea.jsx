import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import classes from './FiltrationArea.module.scss';
import { Button } from '@material-ui/core';
import useOutsideClick from '../../hooks/useOutsideClick';
import { filterParams, housingTypeOptions } from '../../constants/filtrations';

function FiltrationArea() {
  const [flexibleCancellation, setFlexibleCancellation] = useState(false);
  const [housingType, setHousingType] = useState({
    EH: false,
    SR: false,
    HR: false,
    SHR: false,
  });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [instanceBooking, setInstanceBooking] = useState(false);

  const [filterPopupsState, setfilterPopupsState] = useState({
    flexibleCancellation: false,
    housingType: false,
    price: false,
    instanceBooking: false,
  });

  const filterPopupRef = useRef();

  const hideFilterPopups = () =>
    setfilterPopupsState({
      ...Object.entries(filterPopupsState).map(([key]) => ({
        [key]: false,
      })),
    });

  // * Hook that calls callback, if user clicks outside of the passed ref
  useOutsideClick(filterPopupRef, hideFilterPopups);

  const handleFilterPopupOpen = (filterName) => {
    setfilterPopupsState({
      ...filterPopupsState,
      [filterName]: true,
    });
  };

  const handleHousingTypeFilterChange = (e) => {
    setHousingType({
      ...housingType,
      [e.target.name]: !housingType[e.target.name],
    });
  };

  return (
    <div className={[classes.wrapper].join(' ')}>
      {filterParams.map((param) => (
        <div
          key={param.value}
          className={classes.filter}
          onClick={() => handleFilterPopupOpen(param.value)}
        >
          {param.label}
        </div>
      ))}

      {filterPopupsState.flexibleCancellation && (
        <div
          ref={filterPopupRef}
          className={[classes.filterArea, classes.flexibleCancellation].join(
            ' '
          )}
        >
          <div className={classes.filterControl}>
            <p>Показывать только жилье с гибкими правилами отмены</p>
            <Switch
              onChange={() => setFlexibleCancellation(!flexibleCancellation)}
              checked={flexibleCancellation}
              color="secondary"
            />
          </div>
          <Button
            onClick={() => setFlexibleCancellation(false)}
            disabled={!flexibleCancellation}
            className={classes.clearBtn}
          >
            Очистить
          </Button>
        </div>
      )}

      {filterPopupsState.housingType && (
        <div
          ref={filterPopupRef}
          className={[classes.filterArea, classes.housingType].join(' ')}
        >
          <ul>
            {housingTypeOptions.map((option, index) => (
              <li key={index}>
                <Checkbox
                  name={option.value}
                  checked={housingType[option.value]}
                  onChange={handleHousingTypeFilterChange}
                  size="medium"
                  color="secondary"
                />
                <div>
                  <label className={classes.label}>{option.label}</label>
                  <p>{option.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <Button
            onClick={() =>
              setHousingType({
                EH: false,
                SR: false,
                HR: false,
                SHR: false,
              })
            }
            disabled={!Object.values(housingType).reduce((a, v) => a + v)}
            className={classes.clearBtn}
          >
            Очистить
          </Button>
        </div>
      )}

      {filterPopupsState.price && (
        <div
          ref={filterPopupRef}
          className={[classes.filterArea, classes.price].join(' ')}
        >
          <p>До {maxPrice}₽</p>
          <div className={classes.priceControl}>
            <FormControl
              fullWidth
              variant="outlined"
              style={{ marginRight: 5 }}
            >
              <InputLabel htmlFor="outlined-min-price">мин. цена</InputLabel>
              <OutlinedInput
                id="outlined-min-price"
                className={classes.priceInp}
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">₽</InputAdornment>
                }
                labelWidth={60}
                value={minPrice}
                onChange={(e) => setMinPrice(+e.target.value)}
              />
            </FormControl>

            <FormControl fullWidth variant="outlined" style={{ marginLeft: 5 }}>
              <InputLabel htmlFor="outlined-max-price">макс. цена</InputLabel>
              <OutlinedInput
                id="outlined-max-price"
                variant="outlined"
                startAdornment={
                  <InputAdornment position="start">₽</InputAdornment>
                }
                labelWidth={60}
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
              />
            </FormControl>
          </div>

          <Button
            onClick={() => {
              setMinPrice(0);
              setMaxPrice(50000);
            }}
            disabled={minPrice === 0 && maxPrice === 50000}
            className={classes.clearBtn}
          >
            Очистить
          </Button>
        </div>
      )}

      {filterPopupsState.instanceBooking && (
        <div
          ref={filterPopupRef}
          className={[classes.filterArea, classes.instanceBooking].join(' ')}
        >
          <div className={classes.filterControl}>
            <p>
              Объявления, которые можно забронировать, не дожидаясь
              подтверждения хозяина.
            </p>
            <Switch
              onChange={() => setInstanceBooking(!instanceBooking)}
              checked={instanceBooking}
              color="secondary"
            />
          </div>
          <Button
            onClick={() => setInstanceBooking(false)}
            disabled={!instanceBooking}
            className={classes.clearBtn}
          >
            Очистить
          </Button>
        </div>
      )}
    </div>
  );
}

export default React.memo(FiltrationArea);

import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import classes from '../../FiltrationArea.module.scss';
import { useState } from 'react';
import { useRouter } from 'next/router';

function PriceRangePopup({ coreState }, ref) {
  const { setFiltersTouched, filtersTouched, query, setQuery } = coreState;
  const router = useRouter();
  const [priceRange, setPriceRange] = useState({
    minPrice: router.query['price_gte'] || 0,
    maxPrice: router.query['price_lte'] || 50000,
  });

  const handlePriceRangeChange = (e) => {
    const inputName = e.target.name;
    const nextValue = +e.target.value;
    setPriceRange({
      ...priceRange,
      [inputName]: nextValue,
    });
    setFiltersTouched({
      ...filtersTouched,
      price:
        inputName === 'minPrice'
          ? !(priceRange.maxPrice === 50000 && nextValue === 0)
          : !(nextValue === 50000 && priceRange.minPrice === 0),
    });

    const maxPriceQueryParamIndex = query.findIndex(
      (queryParam) => queryParam.name === 'price_lte'
    );

    const minPriceQueryParamIndex = query.findIndex(
      (queryParam) => queryParam.name === 'price_gte'
    );

    const priceQueryIndex =
      inputName === 'maxPrice'
        ? maxPriceQueryParamIndex
        : minPriceQueryParamIndex;

    const priceFilterOperator =
      inputName === 'maxPrice' ? 'price_lte' : 'price_gte';

    if (priceQueryIndex !== -1) {
      const nextQueryState = [...query];
      nextQueryState[priceQueryIndex].value = nextValue;
      setQuery(nextQueryState);
    } else {
      setQuery([
        ...query,
        {
          name: priceFilterOperator,
          value: nextValue,
        },
      ]);
    }
  };

  const reset = () => {
    setPriceRange({
      minPrice: 0,
      maxPrice: 50000,
    });
    setFiltersTouched({
      ...filtersTouched,
      price: false,
    });
    setQuery([
      ...query,
      {
        name: 'price_gte',
        value: 0,
      },
      {
        name: 'price_lte',
        value: 50000,
      },
    ]);
  };

  return (
    <div ref={ref} className={[classes.filterArea, classes.price].join(' ')}>
      <p>До {priceRange.maxPrice}₽</p>
      <div className={classes.priceControl}>
        <FormControl fullWidth variant="outlined" style={{ marginRight: 5 }}>
          <InputLabel htmlFor="outlined-min-price">мин. цена</InputLabel>
          <OutlinedInput
            id="outlined-min-price"
            className={classes.priceInp}
            variant="outlined"
            startAdornment={<InputAdornment position="start">₽</InputAdornment>}
            labelWidth={60}
            value={priceRange.minPrice}
            onChange={handlePriceRangeChange}
            inputProps={{ name: 'minPrice' }}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" style={{ marginLeft: 5 }}>
          <InputLabel htmlFor="outlined-max-price">макс. цена</InputLabel>
          <OutlinedInput
            id="outlined-max-price"
            variant="outlined"
            startAdornment={<InputAdornment position="start">₽</InputAdornment>}
            labelWidth={60}
            value={priceRange.maxPrice}
            onChange={handlePriceRangeChange}
            inputProps={{ name: 'maxPrice' }}
          />
        </FormControl>
      </div>

      <Button
        onClick={reset}
        disabled={priceRange.minPrice === 0 && priceRange.maxPrice === 50000}
        className={classes.clearBtn}
      >
        Очистить
      </Button>
    </div>
  );
}

export default React.forwardRef(PriceRangePopup);

import React from 'react';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import classes from '../../FiltrationArea.module.scss';

function PriceRangePopup(
  { maxPrice, minPrice, handleMaxPriceChange, handleMinPriceChange, reset },
  ref
) {
  return (
    <div ref={ref} className={[classes.filterArea, classes.price].join(' ')}>
      <p>До {maxPrice}₽</p>
      <div className={classes.priceControl}>
        <FormControl fullWidth variant="outlined" style={{ marginRight: 5 }}>
          <InputLabel htmlFor="outlined-min-price">мин. цена</InputLabel>
          <OutlinedInput
            id="outlined-min-price"
            className={classes.priceInp}
            variant="outlined"
            startAdornment={<InputAdornment position="start">₽</InputAdornment>}
            labelWidth={60}
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </FormControl>

        <FormControl fullWidth variant="outlined" style={{ marginLeft: 5 }}>
          <InputLabel htmlFor="outlined-max-price">макс. цена</InputLabel>
          <OutlinedInput
            id="outlined-max-price"
            variant="outlined"
            startAdornment={<InputAdornment position="start">₽</InputAdornment>}
            labelWidth={60}
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </FormControl>
      </div>

      <Button
        onClick={reset}
        disabled={minPrice === 0 && maxPrice === 50000}
        className={classes.clearBtn}
      >
        Очистить
      </Button>
    </div>
  );
}

export default React.forwardRef(PriceRangePopup);

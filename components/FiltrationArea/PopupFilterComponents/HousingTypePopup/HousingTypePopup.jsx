import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { housingTypeOptions } from '../../constants';
import classes from '../../FiltrationArea.module.scss';
import { isHousingTypeSetToDefault } from '../../helpers';

function HousingTypePopup({ housingType, handleChange, reset }, ref) {
  return (
    <div
      ref={ref}
      className={[classes.filterArea, classes.housingType].join(' ')}
    >
      <ul>
        {housingTypeOptions.map((option, index) => (
          <li key={index}>
            <Checkbox
              name={option.value}
              checked={housingType[option.value]}
              onChange={handleChange}
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
        onClick={reset}
        disabled={!isHousingTypeSetToDefault(housingType)}
        className={classes.clearBtn}
      >
        Очистить
      </Button>
    </div>
  );
}

export default React.forwardRef(HousingTypePopup);

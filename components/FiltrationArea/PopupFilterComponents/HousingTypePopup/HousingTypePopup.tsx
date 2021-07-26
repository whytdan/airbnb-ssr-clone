import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { housingTypeOptions } from '../../constants';
import classes from '../../FiltrationArea.module.scss';
import { useRouter } from 'next/router';
import {
  calculateInitialHouseType,
  isHousingTypeStateSetToDefault,
} from './helpers';

function HousingTypePopup({ coreState }, ref) {
  const { setFiltersTouched, filtersTouched, query, setQuery } = coreState;
  const router = useRouter();
  const [housingTypeState, setHousingTypeState] = useState({
    EH: calculateInitialHouseType(router, 'EH'),
    SR: calculateInitialHouseType(router, 'SR'),
    HR: calculateInitialHouseType(router, 'HR'),
    SHR: calculateInitialHouseType(router, 'SHR'),
  });

  const handleChange = (e) => {
    const housingTypeName = e.target.name;
    const nextFilterBoolVal = !housingTypeState[housingTypeName];
    const nextHousingTypeState = {
      ...housingTypeState,
      [housingTypeName]: nextFilterBoolVal,
    };
    setHousingTypeState(nextHousingTypeState);
    if (isHousingTypeStateSetToDefault(nextHousingTypeState)) {
      setFiltersTouched({
        ...filtersTouched,
        housingType: false,
      });
      setQuery(
        query.filter((queryParam) => queryParam.name !== 'housingType_like')
      );
    } else {
      setFiltersTouched({
        ...filtersTouched,
        housingType: true,
      });

      const housingTypeParamIndex = query.findIndex(
        (queryParam) => queryParam.name === 'housingType_like'
      );

      if (housingTypeParamIndex !== -1) {
        const nextQueryState = [...query];
        const prevHousingTypes = nextQueryState[housingTypeParamIndex].value;
        nextQueryState[housingTypeParamIndex] = {
          name: 'housingType_like',
          value: nextFilterBoolVal
            ? [...prevHousingTypes, housingTypeName]
            : prevHousingTypes.filter((name) => name !== housingTypeName),
        };
        setQuery(nextQueryState);
      } else {
        setQuery([
          ...query,
          {
            name: 'housingType_like',
            value: [housingTypeName],
          },
        ]);
      }
    }
  };

  const resetHousingTypeState = () => {
    setHousingTypeState({
      EH: false,
      SR: false,
      HR: false,
      SHR: false,
    });
    setFiltersTouched({
      ...filtersTouched,
      housingType: false,
    });
    setQuery(
      query.filter((queryParam) => queryParam.name !== 'housingType_like')
    );
  };

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
              checked={housingTypeState[option.value]}
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
        onClick={resetHousingTypeState}
        disabled={!!isHousingTypeStateSetToDefault(housingTypeState)}
        className={classes.clearBtn}
      >
        Очистить
      </Button>
    </div>
  );
}

export default React.forwardRef(HousingTypePopup);

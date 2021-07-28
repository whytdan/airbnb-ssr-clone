import { NextRouter } from 'next/router';
import { IhousingTypeState } from './interfaces';

export const calculateInitialHouseType = (
  router: NextRouter,
  houseType: string
) => {
  const queryParamValue = router.query['housingType_like'];
  if (queryParamValue) {
    return typeof queryParamValue === 'string'
      ? queryParamValue === houseType
      : queryParamValue.includes(houseType);
  }
  return false;
};

export const isHousingTypeStateSetToDefault = (state: IhousingTypeState) =>
  !Object.values(state).reduce((a, v) => a || v);

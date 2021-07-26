import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import classes from './FiltrationArea.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick';
import { filterParams } from './constants';
import FilterButton from './FilterButton';
import { useRouter } from 'next/router';
import {
  IFiltersPopupIsOpen,
  IFiltersPopupIsTouched,
  IFiltrationAreaCore,
  IFiltrationAreaQueryParam,
} from './interfaces';

const FlexibleCancellationPopup = dynamic(
  import('./PopupFilterComponents/FlexibleCancellationPopup')
);

const HousingTypePopup = dynamic(
  import('./PopupFilterComponents/HousingTypePopup')
);
const InstanceBookingPopup = dynamic(
  import('./PopupFilterComponents/InstanceBookingPopup')
);
const PriceRangePopup = dynamic(
  import('./PopupFilterComponents/PriceRangePopup')
);

function FiltrationArea() {
  const router = useRouter();

  const [filtersPopupIsOpen, setFiltersPopupIsOpen] =
    useState<IFiltersPopupIsOpen>({
      flexibleCancellation: false,
      housingType: false,
      price: false,
      instanceBooking: false,
    });

  const [filtersTouched, setFiltersTouched] = useState<IFiltersPopupIsTouched>({
    flexibleCancellation: !!router.query.flexibleCancellation,
    housingType: !!router.query['housingType_like'],
    price:
      (+router.query['price_lte'] !== 50000 && !!router.query['price_lte']) ||
      (+router.query['price_gte'] !== 0 && !!router.query['price_gte']),
    instanceBooking: !!router.query.instanceBooking,
  });

  const [query, setQuery] = useState<IFiltrationAreaQueryParam[]>([]);

  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  const filterPopupRef = useRef();

  useEffect(() => {
    console.log(query);
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      router.replace(
        {
          pathname: `/categories/${router.query.slug}`,
          query: query.reduce((a, queryParam) => {
            return {
              ...a,
              [queryParam.name]: queryParam.value,
            };
          }, {}),
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, [query]);

  const hideFilterPopups = () =>
    setFiltersPopupIsOpen({
      flexibleCancellation: false,
      housingType: false,
      price: false,
      instanceBooking: false,
    });

  // * Hook that calls callback, if user clicks outside of the passed ref
  useOutsideClick(filterPopupRef, hideFilterPopups);

  const handleFilterPopupOpen = (filterName) => {
    setFiltersPopupIsOpen({
      ...filtersPopupIsOpen,
      [filterName]: true,
    });
  };

  const filtrationAreaStateObject: IFiltrationAreaCore = {
    setFiltersTouched,
    filtersTouched,
    setQuery,
    query,
  };

  return (
    <div className={[classes.wrapper].join(' ')}>
      {filterParams.map((param) => (
        <FilterButton
          key={param.filterName}
          label={param.label}
          handleFilterPopupOpen={() => handleFilterPopupOpen(param.filterName)}
          isActive={filtersTouched[param.filterName]}
        />
      ))}

      {filtersPopupIsOpen.flexibleCancellation && (
        <FlexibleCancellationPopup
          coreState={filtrationAreaStateObject}
          filterPopupRef={filterPopupRef}
        />
      )}

      {filtersPopupIsOpen.housingType && (
        <HousingTypePopup
          coreState={filtrationAreaStateObject}
          filterPopupRef={filterPopupRef}
        />
      )}

      {filtersPopupIsOpen.price && (
        <PriceRangePopup
          coreState={filtrationAreaStateObject}
          filterPopupRef={filterPopupRef}
        />
      )}

      {filtersPopupIsOpen.instanceBooking && (
        <InstanceBookingPopup
          coreState={filtrationAreaStateObject}
          filterPopupRef={filterPopupRef}
        />
      )}
    </div>
  );
}

export default React.memo(FiltrationArea);

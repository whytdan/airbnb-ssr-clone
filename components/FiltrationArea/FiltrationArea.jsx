import React, { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import classes from './FiltrationArea.module.scss';
import useOutsideClick from '../../hooks/useOutsideClick';
import { filterParams } from './constants';
import { useContext } from 'react';
import { homesContext } from '../../contexts/HomesContextProvider';
import FilterButton from './FilterButton';
import { isHousingTypeSetToDefault } from './helpers';

const FlexibleCancellationPopup = dynamic(
  import('./PopupFilterComponents/FlexibleCancellationPopup'),
  {
    ssr: false,
  }
);

const HousingTypePopup = dynamic(
  import('./PopupFilterComponents/HousingTypePopup'),
  {
    ssr: false,
  }
);
const InstanceBookingPopup = dynamic(
  import('./PopupFilterComponents/InstanceBookingPopup'),
  {
    ssr: false,
  }
);
const PriceRangePopup = dynamic(
  import('./PopupFilterComponents/PriceRangePopup/'),
  {
    ssr: false,
  }
);

function FiltrationArea({ setPageNumber }) {
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

  const [filtersPopupState, setFiltersPopupState] = useState({
    flexibleCancellation: false,
    housingType: false,
    price: false,
    instanceBooking: false,
  });

  const [filtersTouched, setFiltersTouched] = useState({
    flexibleCancellation: false,
    housingType: false,
    price: false,
    instanceBooking: false,
  });

  const { setHomesFilterParams } = useContext(homesContext);

  const filterPopupRef = useRef();

  const hideFilterPopups = () =>
    setFiltersPopupState({
      ...Object.entries(filtersPopupState).map(([key]) => ({
        [key]: false,
      })),
    });

  // * Hook that calls callback, if user clicks outside of the passed ref
  useOutsideClick(filterPopupRef, hideFilterPopups);

  const handleFilterPopupOpen = (filterName) => {
    setFiltersPopupState({
      ...filtersPopupState,
      [filterName]: true,
    });
  };

  const handleFlexibleCancellationFilterChange = async () => {
    const newValue = !flexibleCancellation;
    setFlexibleCancellation(newValue);
    setFiltersTouched({
      ...filtersTouched,
      flexibleCancellation: !filtersTouched.flexibleCancellation,
    });
    setHomesFilterParams({ flexibleCancellation: newValue ? newValue : '' });
    setPageNumber(1);
  };

  const handleHousingTypeFilterChange = (e) => {
    const newState = {
      ...housingType,
      [e.target.name]: !housingType[e.target.name],
    };
    setHousingType(newState);
    if (isHousingTypeSetToDefault(newState)) {
      setFiltersTouched({
        ...filtersTouched,
        housingType: true,
      });
    } else {
      setFiltersTouched({
        ...filtersTouched,
        housingType: false,
      });
    }
    setHomesFilterParams({ housingType: newState });
    setPageNumber(1);
  };

  const resetHousingTypeFilter = () => {
    setHousingType({
      EH: false,
      SR: false,
      HR: false,
      SHR: false,
    });
    setFiltersTouched({
      ...filtersTouched,
      housingType: false,
    });
    setHomesFilterParams({ housingType: '' });
    setPageNumber(1);
  };

  const handleMaxPriceChange = (e) => {
    const newValue = +e.target.value;
    setMaxPrice(newValue);
    setFiltersTouched({
      ...filtersTouched,
      price: !(newValue === 50000 && minPrice === 0),
    });
    setHomesFilterParams({ maxPrice: newValue });
    setPageNumber(1);
  };

  const handleMinPriceChange = (e) => {
    const newValue = +e.target.value;
    setMinPrice(newValue);
    setFiltersTouched({
      ...filtersTouched,
      price: !(maxPrice === 50000 && newValue === 0),
    });
    setHomesFilterParams({ minPrice: newValue });
    setPageNumber(1);
  };

  const resetPriceRangeFilter = () => {
    setMinPrice(0);
    setMaxPrice(50000);
    setFiltersTouched({
      ...filtersTouched,
      price: false,
    });
    setHomesFilterParams({ minPrice: 0, maxPrice: 50000 });
    setPageNumber(1);
  };

  const handleInstanceBooikngFilterChange = async () => {
    const newValue = !instanceBooking;
    setInstanceBooking(newValue);
    setFiltersTouched({
      ...filtersTouched,
      instanceBooking: !filtersTouched.instanceBooking,
    });
    setHomesFilterParams({ instanceBooking: newValue ? newValue : '' });
    setPageNumber(1);
  };

  return (
    <div className={[classes.wrapper].join(' ')}>
      {filterParams.map((param) => (
        <FilterButton
          key={param.value}
          label={param.label}
          handleFilterPopupOpen={() => handleFilterPopupOpen(param.value)}
          isActive={filtersTouched[param.value]}
        />
      ))}

      {filtersPopupState.flexibleCancellation && (
        <FlexibleCancellationPopup
          value={flexibleCancellation}
          handleChange={handleFlexibleCancellationFilterChange}
          filterPopupRef={filterPopupRef}
        />
      )}

      {filtersPopupState.housingType && (
        <HousingTypePopup
          housingType={housingType}
          handleChange={handleHousingTypeFilterChange}
          reset={resetHousingTypeFilter}
          filterPopupRef={filterPopupRef}
        />
      )}

      {filtersPopupState.price && (
        <PriceRangePopup
          maxPrice={maxPrice}
          minPrice={minPrice}
          handleMaxPriceChange={handleMaxPriceChange}
          handleMinPriceChange={handleMinPriceChange}
          reset={resetPriceRangeFilter}
          filterPopupRef={filterPopupRef}
        />
      )}

      {filtersPopupState.instanceBooking && (
        <InstanceBookingPopup
          value={instanceBooking}
          handleChange={handleInstanceBooikngFilterChange}
          filterPopupRef={filterPopupRef}
        />
      )}
    </div>
  );
}

export default React.memo(FiltrationArea);

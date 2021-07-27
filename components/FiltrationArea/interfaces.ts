export interface IFiltersPopupIsOpen {
  flexibleCancellation: boolean;
  housingType: boolean;
  price: boolean;
  instanceBooking: boolean;
}

export interface IFiltersPopupIsTouched {
  flexibleCancellation: boolean;
  housingType: boolean;
  price: boolean;
  instanceBooking: boolean;
}

export interface IFiltrationAreaQueryParam {
  name: string;
  value: any;
}

export interface IFiltrationAreaCore {
  setFiltersTouched(nextState: IFiltersPopupIsTouched): void;
  filtersTouched: IFiltersPopupIsTouched;
  setQuery(nexState: IFiltrationAreaQueryParam[]): void;
  query: IFiltrationAreaQueryParam[];
}

export interface FilterPopupProps {
  coreState: IFiltrationAreaCore;
  filterPopupRef: React.RefObject<HTMLDivElement>;
}

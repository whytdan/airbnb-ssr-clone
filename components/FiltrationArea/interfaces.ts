export interface IFiltersPopupIsOpen {
  flexibleCancellation: boolean;
  housingType: boolean;
  price: boolean;
  instanceBooking: boolean;
  [key: string]: boolean;
}

export interface IFiltersPopupIsTouched {
  flexibleCancellation: boolean;
  housingType: boolean;
  price: boolean;
  instanceBooking: boolean;
  [key: string]: boolean;
}

export interface IFiltrationAreaQueryParam {
  name: string;
  value: any;
}

export interface IFiltrationAreaCore {
  setFiltersTouched(_nextState: IFiltersPopupIsTouched): void;
  filtersTouched: IFiltersPopupIsTouched;
  setQuery(_nexState: IFiltrationAreaQueryParam[]): void;
  query: IFiltrationAreaQueryParam[];
}

export interface FilterPopupWrapperProps {
  coreState: IFiltrationAreaCore;
  filterPopupRef: React.RefObject<HTMLDivElement>;
}

export interface FilterPopupProps {
  coreState: IFiltrationAreaCore;
}

import { FilterPopupProps } from '../../interfaces';
import HousingTypePopup from './HousingTypePopup';

export default function WrappedHousingTypePopup(props: FilterPopupProps) {
  return (
    <HousingTypePopup coreState={props.coreState} ref={props.filterPopupRef} />
  );
}

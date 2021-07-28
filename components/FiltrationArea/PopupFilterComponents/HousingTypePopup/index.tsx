import { FilterPopupWrapperProps } from '../../interfaces';
import HousingTypePopup from './HousingTypePopup';

export default function WrappedHousingTypePopup(
  props: FilterPopupWrapperProps
) {
  return (
    <HousingTypePopup coreState={props.coreState} ref={props.filterPopupRef} />
  );
}

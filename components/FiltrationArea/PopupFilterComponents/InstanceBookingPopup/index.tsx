import { FilterPopupWrapperProps } from '../../interfaces';
import InstanceBookingPopup from './InstanceBookingPopup';

export default function WrappedInstanceBookingPopup(
  props: FilterPopupWrapperProps
) {
  return (
    <InstanceBookingPopup
      coreState={props.coreState}
      ref={props.filterPopupRef}
    />
  );
}

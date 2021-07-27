import { FilterPopupProps } from '../../interfaces';
import InstanceBookingPopup from './InstanceBookingPopup';

export default function WrappedInstanceBookingPopup(props: FilterPopupProps) {
  return (
    <InstanceBookingPopup
      coreState={props.coreState}
      ref={props.filterPopupRef}
    />
  );
}

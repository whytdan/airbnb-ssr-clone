import InstanceBookingPopup from './InstanceBookingPopup';

export default function WrappedInstanceBookingPopup(props) {
  return (
    <InstanceBookingPopup
      coreState={props.coreState}
      ref={props.filterPopupRef}
    />
  );
}

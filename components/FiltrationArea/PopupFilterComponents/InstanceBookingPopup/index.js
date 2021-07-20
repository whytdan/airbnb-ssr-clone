import InstanceBookingPopup from './InstanceBookingPopup';

export default function WrappedInstanceBookingPopup({
  filterPopupRef,
  ...props
}) {
  return <InstanceBookingPopup {...props} ref={filterPopupRef} />;
}

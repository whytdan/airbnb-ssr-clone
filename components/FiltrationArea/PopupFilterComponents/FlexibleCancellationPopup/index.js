import FlexibleCancellationPopup from './FlexibleCancellationPopup';

export default function WrappedFlexibleCancellationPopup({
  filterPopupRef,
  ...props
}) {
  return <FlexibleCancellationPopup {...props} ref={filterPopupRef} />;
}

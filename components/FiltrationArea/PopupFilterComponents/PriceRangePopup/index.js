import PriceRangePopup from './PriceRangePopup';

export default function WrappedPriceRangePopup({ filterPopupRef, ...props }) {
  return <PriceRangePopup {...props} ref={filterPopupRef} />;
}

import PriceRangePopup from './PriceRangePopup';

export default function WrappedPriceRangePopup(props) {
  return (
    <PriceRangePopup coreState={props.coreState} ref={props.filterPopupRef} />
  );
}

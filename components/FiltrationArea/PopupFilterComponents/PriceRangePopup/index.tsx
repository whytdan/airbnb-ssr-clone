import { FilterPopupWrapperProps } from '../../interfaces';
import PriceRangePopup from './PriceRangePopup';

export default function WrappedPriceRangePopup(props: FilterPopupWrapperProps) {
  return (
    <PriceRangePopup coreState={props.coreState} ref={props.filterPopupRef} />
  );
}

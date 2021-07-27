import { FilterPopupProps } from '../../interfaces';
import PriceRangePopup from './PriceRangePopup';

export default function WrappedPriceRangePopup(props: FilterPopupProps) {
  return (
    <PriceRangePopup coreState={props.coreState} ref={props.filterPopupRef} />
  );
}

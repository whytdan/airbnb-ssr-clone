import { FilterPopupProps } from '../../interfaces';
import FlexibleCancellationPopup from './FlexibleCancellationPopup';

export default function WrappedFlexibleCancellationPopup(
  props: FilterPopupProps
) {
  return (
    <FlexibleCancellationPopup
      coreState={props.coreState}
      ref={props.filterPopupRef}
    />
  );
}

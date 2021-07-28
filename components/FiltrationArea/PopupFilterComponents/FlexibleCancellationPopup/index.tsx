import { FilterPopupWrapperProps } from '../../interfaces';
import FlexibleCancellationPopup from './FlexibleCancellationPopup';

export default function WrappedFlexibleCancellationPopup(
  props: FilterPopupWrapperProps
) {
  return (
    <FlexibleCancellationPopup
      coreState={props.coreState}
      ref={props.filterPopupRef}
    />
  );
}

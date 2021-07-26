import { IFilterPopupProps } from '../../interfaces';
import FlexibleCancellationPopup from './FlexibleCancellationPopup';

export default function WrappedFlexibleCancellationPopup(props) {
  return (
    <FlexibleCancellationPopup
      coreState={props.coreState}
      ref={props.filterPopupRef}
    />
  );
}

import HousingTypePopup from './HousingTypePopup';

export default function WrappedHousingTypePopup(props) {
  return (
    <HousingTypePopup coreState={props.coreState} ref={props.filterPopupRef} />
  );
}

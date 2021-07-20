import HousingTypePopup from './HousingTypePopup';

export default function WrappedHousingTypePopup({ filterPopupRef, ...props }) {
  return <HousingTypePopup {...props} ref={filterPopupRef} />;
}

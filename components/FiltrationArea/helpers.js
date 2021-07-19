export const isHousingTypeSetToDefault = (housingType) =>
  Object.values(housingType).reduce((a, v) => a + v);

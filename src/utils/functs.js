export const filterArr = (arr, target) => {
  if (!arr || !target) return [];
  return arr.filter((item) => item !== target);
};

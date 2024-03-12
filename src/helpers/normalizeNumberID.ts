export const normalizeNumberID = (rawID: string): number => {
  const checkedID = Number(rawID);

  return isNaN(checkedID) ? 0 : checkedID;
};

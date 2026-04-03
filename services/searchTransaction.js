export const searchTransaction = (list, id) => {
  const found = list.find((item) => item.id == id);

  return found;
};

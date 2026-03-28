export const balanceAdjust = (transactions) => {
  const res = transactions.reduce((acc, item) => {
    return acc + item.value;
  }, 0);

  return res;
};

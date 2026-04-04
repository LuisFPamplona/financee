export const balanceAdjust = (transactions) => {
  const res = transactions.reduce((acc, item) => {
    let itemValue = item.value;
    if (item.type === "outcome") {
      itemValue = itemValue * -1;
    }
    return acc + itemValue;
  }, 0);

  return res;
};

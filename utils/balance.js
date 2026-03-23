export const balanceAdjust = (transactions) => {
  const res = transactions.reduce((acc, item) => {
    return acc + item.value;
  }, 0);
  const balanceText = String(res).replace(".", ",");

  if (balanceText.includes(",")) {
    const centsStart = balanceText.indexOf(",");
    const cents = balanceText.slice(centsStart);

    if (cents.length < 3) {
      return balanceText + "0";
    } else {
      return balanceText;
    }
  } else {
    return balanceText + ",00";
  }
};

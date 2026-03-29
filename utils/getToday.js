export const getToday = () => {
  const date = new Date();
  const day = String(date.getDate());
  let month = String(date.getMonth() + 1);
  const year = String(date.getFullYear());

  if (month.length == 1) {
    month = "0" + month;
  }

  return { day, month, year };
};

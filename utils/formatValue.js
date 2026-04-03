export const formatValue = (value) => {
  if (typeof value == "string" && value.includes(",")) {
    let formatted = value.replace(",", ".");
    return Number(formatted);
  } else if (typeof value === "string" && value.includes(".")) {
    return Number(value);
  } else {
    return value;
  }
};

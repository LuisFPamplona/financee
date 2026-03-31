export const validateTransaction = (data) => {
  if (data.name.trim() === "") {
    return { success: false, error: "Invalid Name" };
  }

  if (data.value === "" || data.value < 0) {
    return { success: false, error: "Invalid Value" };
  }

  if (data.type !== "outcome" && data.type !== "income") {
    return { success: false, error: "Invalid Type" };
  }

  if (
    data.date.day === undefined ||
    data.date.month === undefined ||
    data.date.year === undefined
  ) {
    return { success: false, error: "Invalid Date" };
  }

  if (data.category === undefined) {
    return { success: false, error: "Invalid Category" };
  }

  return { success: true, data };
};

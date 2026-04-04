export const validateTransaction = (data) => {
  if (data.name.trim() === "") {
    return { success: false, error: "Nome inválido" };
  }

  if (data.value === "" || data.value < 0) {
    return { success: false, error: "Valor inválido" };
  }

  if (data.type !== "outcome" && data.type !== "income") {
    return { success: false, error: "Tipo inválido" };
  }

  if (
    data.date.day === undefined ||
    data.date.month === undefined ||
    data.date.year === undefined
  ) {
    return { success: false, error: "Data inválida" };
  }

  if (data.category === undefined) {
    return { success: false, error: "Categoria inválida" };
  }

  return { success: true, data };
};

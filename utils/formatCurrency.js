export const formatCurrency = (value) => {
  const formatted = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return formatted;
};

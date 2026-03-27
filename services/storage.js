export const saveTransaction = (data) => {
  localStorage.setItem("transactionList", JSON.stringify(data));
};

export const loadTransaction = () => {
  const data = localStorage.getItem("transactionList");
  return data ? JSON.parse(data) : [];
};

export const saveCategory = (data) => {
  localStorage.setItem("categoryList", JSON.stringify(data));
};

export const loadCaterogy = () => {
  return ["Salário", "Comida", "Automóvel", "Combustível", "Saúde", "Imóvel"];
};

/*
const data = {
        id: String,
        name: String,
        value: Number,
        type: String, // income || outcome
        date: String,
        category: String
      };
*/

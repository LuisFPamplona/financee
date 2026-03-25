export const saveTransaction = (data) => {
  localStorage.setItem("transactionList", JSON.stringify(data));
};

export const loadTransaction = () => {
  const data = localStorage.getItem("transactionList");
  return data ? JSON.parse(data) : [];
};

/*
const data = {
        id: String,
        name: String,
        value: Number,
        type: String, // income || outcome
        date: String,
      };
*/

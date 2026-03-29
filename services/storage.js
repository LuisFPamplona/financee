export const saveTransaction = (data) => {
  localStorage.setItem("transactionList", JSON.stringify(data));
};

export const loadTransaction = () => {
  const data = localStorage.getItem("transactionList");
  const parsed = data ? JSON.parse(data) : [];

  const hasOldFormat = parsed.some((t) => typeof t.date === "string");

  const migrated = parsed.map((transaction) => {
    if (
      transaction.date &&
      typeof transaction.date === "object" &&
      "day" in transaction.date
    ) {
      return transaction;
    }

    if (typeof transaction.date === "string") {
      const parts = transaction.date.split("/");

      if (parts.length === 3) {
        const [day, month, year] = parts;

        return {
          ...transaction,
          date: { day, month, year },
        };
      }
    }

    return transaction;
  });

  if (hasOldFormat) {
    saveTransaction(migrated);
  }

  return migrated;
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
        date: {
                      day: String,
                      month: String,
                      year: String,
                    },
        category: String
      };
*/

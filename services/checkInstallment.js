export const checkInstallment = (installmentNumber) => {
  if (installmentNumber > 1) {
    return true;
  } else {
    return false;
  }
};

export const numberOfInstallments = (installments) => {
  if (checkInstallment(installments)) {
    return installments;
  } else {
    return 1;
  }
};

export const setInstallmentId = (installments) => {
  if (installments == 0) {
    return 0;
  }

  return `${installments}${Date.now()}`;
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
        category: String,
        installment: {
          isInstallment : boleean,
          id : string,
          amount: number
        }
          installmentNumber: number,
      };
*/
export const separateInstallmentsTransactions = (data) => {
  let transactionList = [];

  for (let i = 0; i < data.installment.amount; i++) {
    const newData = {
      ...data,
      id: Date.now() + i, // each transaction gets a unique id
      value: data.value / data.installment.amount,
      installmentNumber: i + 1,
      date: {
        ...data.date,
      },
    };

    newData.date.month = formatMonth(Number(data.date.month) + i);
    newData.date.year = formatYear(
      Number(data.date.month),
      i,
      Number(data.date.year),
    );

    transactionList.push(newData);
  }

  return transactionList;
};

const formatMonth = (month) => {
  if (month > 12) {
    let difference = month - 12;
    return String(difference).padStart(2, "0");
  } else {
    return String(month).padStart(2, "0");
  }
};

const formatYear = (initialMonth, i, year) => {
  const yearOffset = Math.floor((initialMonth + i - 1) / 12);
  return Number(year) + yearOffset;
};

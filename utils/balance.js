export const balanceAdjust = (transactions) => {
  return transactions.reduce((acc, item) => {
    return acc + item.value;
  }, 0);
};

//pegar as trancaçoes -> separar os valores -> calcular o saldo
//sempre que a lista de transaçao mudare

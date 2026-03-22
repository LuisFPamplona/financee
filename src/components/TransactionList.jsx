import React from "react";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions, deleteTransaction }) => {
  const transactionList = transactions.map((item, index) => {
    return (
      <div className="w-64" key={index}>
        <TransactionItem
          value={item.value}
          date={item.date}
          name={item.name}
          type={item.type}
          id={item.id}
          onDelete={deleteTransaction}
        />
      </div>
    );
  });

  return (
    <>
      <div>{transactionList}</div>
    </>
  );
};

export default TransactionList;

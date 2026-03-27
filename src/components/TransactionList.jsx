import React from "react";
import TransactionItem from "./TransactionItem";
import { useNavigate } from "react-router-dom";

const TransactionList = ({ transactions }) => {
  const navigate = useNavigate();

  const transactionList = transactions.map((item, index) => {
    return (
      <div
        className="w-full cursor-pointer hover:scale-105 active:scale-95 transition-all"
        key={index}
        onClick={() => navigate(`/transaction/${item.id}`)}
      >
        <TransactionItem
          value={item.value}
          date={item.date}
          name={item.name}
          type={item.type}
          category={item.category}
        />
      </div>
    );
  });

  if (transactionList.length < 1) {
    return (
      <>
        <p>Sem transaçoes</p>
      </>
    );
  }

  return (
    <>
      <div>{transactionList}</div>
    </>
  );
};

export default TransactionList;

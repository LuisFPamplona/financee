import React from "react";
import TransactionItem from "./TransactionItem";
import { useNavigate } from "react-router-dom";
import { ArrowUpDown, BrushCleaning, MoveDown, Wind } from "lucide-react";

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
        <div className="flex flex-col gap-70 mt-12">
          <div className="flex flex-col items-center text-2xl">
            <p>Nenhuma transação</p>
            <p className="flex">
              <BrushCleaning />
              <Wind />
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p>Adicione uma transação</p>
            <p>apertando aqui</p>
            <p>
              <MoveDown />
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="pb-24">{transactionList}</div>
    </>
  );
};

export default TransactionList;

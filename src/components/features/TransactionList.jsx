import { useNavigate } from "react-router-dom";

import NothingHere from "../ui/NothingHere";
import TransactionItem from "./TransactionItem";

const TransactionList = ({ transactions, visible }) => {
  const navigate = useNavigate();

  const transactionList = transactions.map((item, index) => {
    return (
      <div
        className="w-full cursor-pointer transition-all"
        key={index}
        onClick={() => navigate(`/transaction/${item.id}`)}
      >
        <TransactionItem
          value={item.value}
          date={item.date}
          name={item.name}
          type={item.type}
          category={item.category}
          visible={visible}
        />
      </div>
    );
  });

  if (transactionList.length < 1) {
    return (
      <>
        <div className="flex flex-col gap-70">
          <NothingHere />
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

import { useNavigate } from "react-router-dom";
import TransactionList from "../components/TransactionList.jsx";
import { Banknote } from "lucide-react";
import MonthSelector from "../components/MonthSelector.jsx";

const Dashboard = ({ balance, transactions, deleteTransaction }) => {
  const navigate = useNavigate();

  return (
    <>
      <section className="flex flex-col w-full items-center justify-center gap-2 ">
        <div className="flex-col items-baseline">
          <p className="text-sm font-bold text-center mt-4">Saldo total</p>
          <div className="flex justify-center items-baseline gap-1 font-bold text-4xl">
            <p className="text-[14pt]">R$</p>
            {balance}
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="bg-gray-700 p-2 text-white font-bold rounded-2xl flex justify-center items-center gap-2 active:scale-95 cursor-pointer hover:scale-105 transition-all"
            onClick={() => navigate("/AddTransaction")}
          >
            <p>Nova transaçao</p>
            <Banknote color="green" fill="lime" className="pt-0.5 scale-140" />
          </button>
        </div>

        <div className="w-full">
          <MonthSelector />
        </div>

        <div className="w-full flex items-center justify-center">
          <TransactionList
            transactions={transactions}
            deleteTransaction={deleteTransaction}
          />
        </div>
      </section>
    </>
  );
};

export default Dashboard;

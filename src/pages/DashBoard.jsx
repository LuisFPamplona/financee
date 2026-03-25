import { useNavigate } from "react-router-dom";
import TransactionList from "../components/TransactionList.jsx";
import { Banknote } from "lucide-react";
import MonthSelector from "../components/MonthSelector.jsx";
import BottomNav from "../components/BottomNav.jsx";

const Dashboard = ({ balance, transactions }) => {
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
        <div className="w-full">
          <MonthSelector />
        </div>

        <div className="w-full flex items-center justify-center">
          <TransactionList transactions={transactions} />
        </div>
        <div>
          <BottomNav />
        </div>
      </section>
    </>
  );
};

export default Dashboard;

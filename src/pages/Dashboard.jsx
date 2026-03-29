import TransactionList from "../components/features/TransactionList";
import { formatCurrency } from "../../utils/formatCurrency.js";

const Dashboard = ({ balance, transactions }) => {
  return (
    <>
      <section className="flex flex-col w-full items-center  justify-center gap-2 ">
        <div className="flex-col items-baseline bg-zinc-900 w-full h-24">
          <p className="text-sm font-bold text-center mt-4 text-white">
            Saldo total
          </p>
          <div className="flex justify-center items-baseline gap-1 font-bold text-white text-4xl">
            {formatCurrency(balance)}
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <TransactionList transactions={transactions} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;

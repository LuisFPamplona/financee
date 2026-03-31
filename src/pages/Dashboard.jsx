import TransactionList from "../components/features/TransactionList";
import { formatCurrency } from "../../utils/formatCurrency.js";

import EyeButton from "../components/features/EyeButton.jsx";

const Dashboard = ({ balance, transactions, visible, setVisible }) => {
  return (
    <>
      <section className="flex flex-col w-screen items-center  justify-center gap-2 ">
        <div className="flex items-center pl-4 gap-1 bg-zinc-950 w-full h-18">
          <div className="flex flex-col w-72">
            <p className="text-sm font-bold text-left text-white">
              Saldo total
            </p>
            <div className="flex justify-center items-baseline gap-1 font-bold text-white text-3xl">
              {visible && <p className=" w-82">{formatCurrency(balance)}</p>}
              {!visible && (
                <p className="w-82 flex items-center gap-2">
                  R$ <span className="bg-zinc-800 w-48 h-8 mt-1" />
                </p>
              )}
            </div>
          </div>
          <span className="pt-7">
            <EyeButton visible={visible} setVisible={setVisible} />
          </span>
        </div>

        <div className="w-full flex items-center justify-center">
          <TransactionList transactions={transactions} visible={visible} />
        </div>
      </section>
    </>
  );
};

export default Dashboard;

import { useNavigate } from "react-router-dom";
import TransactionList from "../components/TransactionList.jsx";

const Dashboard = ({ balance, transactions, deleteTransaction }) => {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex flex-col w-full items-center justify-center gap-2">
        <div className=" border w-24 h-24 mt-4 flex justify-center items-center font-bold">
          R${balance}
        </div>
        <div className="">
          <button
            className="bg-green-400 p-2 text-white font-bold rounded-2xl flex justify-center items-center active:scale-95 cursor-pointer hover:scale-105 transition-all"
            onClick={() => navigate("/AddTransaction")}
          >
            <p>Registrar transaçao</p>
          </button>
        </div>
        <TransactionList
          transactions={transactions}
          deleteTransaction={deleteTransaction}
        />
      </section>
    </>
  );
};

export default Dashboard;

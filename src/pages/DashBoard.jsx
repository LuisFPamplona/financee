import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ balance, setBalance }) => {
  const navigate = useNavigate();
  return (
    <>
      <section className="flex flex-col w-full items-center justify-center gap-2">
        <div className=" border w-24 h-24 mt-4 flex justify-center items-center font-bold">
          R${balance}
        </div>
        <div className="">
          <button
            className="bg-green-400 w-8 h-8 rounded-2xl flex justify-center items-center active:scale-95"
            onClick={() => navigate("/AddTransaction")}
          >
            <BanknoteArrowUp />
          </button>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

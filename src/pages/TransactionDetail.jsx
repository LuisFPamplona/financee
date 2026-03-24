import { useNavigate, useParams } from "react-router-dom";
import { loadTransaction } from "../../services/storage";
import { useEffect, useState } from "react";

const TransactionDetail = ({ onDelete }) => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const transactionList = loadTransaction();
    const found = transactionList.find(
      (element) => element.id == transactionId,
    );
    setTransaction(found);
  }, [transactionId]);

  if (!transaction) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <button
        className="border rounded-xl p-1.5 font-bold bg-black text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        onClick={() => navigate("/")}
      >
        Voltar
      </button>
      <div className="flex flex-col border justify-center items-center mt-4 mr-4 ml-4">
        <p>{transaction.name}</p>
        <p>{transaction.date}</p>
        <p>{transaction.value}</p>
      </div>
      <button
        className="border rounded-xl p-1.5 font-bold bg-red-400 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        onClick={() => {
          onDelete(transaction.id);
          navigate("/");
        }}
      >
        Deletar
      </button>
    </>
  );
};

export default TransactionDetail;

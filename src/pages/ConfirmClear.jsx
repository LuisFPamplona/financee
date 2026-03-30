import { useNavigate } from "react-router-dom";
import { deleteTransactions, loadTransaction } from "../../services/storage.js";

const ConfirmClear = ({ setTransactions }) => {
  const navigate = useNavigate();
  return (
    <>
      <section className="w-full flex items-center justify-center mt-16">
        <div className="w-82 flex flex-col justify-center items-center border p-2 rounded-2xl">
          <p className="text-center">
            <span>
              Tem certeza que quer deletar{" "}
              <span className="font-bold">TODOS</span> os dados?
            </span>
          </p>
          <div className="flex justify-between w-full mt-4 mb-2">
            <button
              className="border w-24 h-12 bg-neutral-800 rounded text-white font-bold cursor-pointer active:scale-98 transition-all"
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button
              className="border w-24 h-12 bg-red-600 rounded text-white font-bold cursor-pointer active:scale-98 transition-all"
              onClick={() => {
                setTransactions(() => {
                  deleteTransactions();
                  return loadTransaction();
                });
                navigate("/");
              }}
            >
              Confirmar
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfirmClear;

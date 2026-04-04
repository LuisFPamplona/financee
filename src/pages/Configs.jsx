import { ChevronRight, CircuitBoard, SendHorizonal, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteTransactions, loadTransaction } from "../../services/storage";

const Configs = ({ setTransactions }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Seus dados serão excluídos permanentemente.",
      icon: "warning",
      background: "#18181b",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      setTransactions(() => {
        deleteTransactions();
        return loadTransaction();
      });
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-zinc-950 w-full flex items-center pl-4 h-18">
          <p className="text-2xl text-white">Configuraçoes</p>
        </div>
        <div className="flex flex-col justify-center items-center mt-16">
          <div
            className="border mt-1 p-1 border-white bg-zinc-900 w-86 rounded h-12 flex items-center justify-between cursor-pointer"
            onClick={() => handleDelete()}
          >
            <p className="flex gap-1 items-center">
              <Trash size={20} color="white" />
              <span className="text-white">|</span>
              <span className="text-white">Limpar dados</span>
            </p>
            <ChevronRight color="white" />
          </div>

          <div className="border mt-1 p-1 border-white bg-zinc-900 w-86 rounded h-12 flex items-center justify-between cursor-pointer">
            <p className="flex gap-1 items-center">
              <SendHorizonal size={20} color="white" />
              <span className="text-white">|</span>
              <span className="text-white">Feedback</span>
            </p>
            <ChevronRight color="white" />
          </div>

          <div className="border mt-1 p-1 border-white bg-zinc-900 w-86 rounded h-12 flex items-center justify-between cursor-pointer">
            <p className="flex gap-1 items-center">
              <CircuitBoard size={20} color="white" />
              <span className="text-white">|</span>
              <span className="text-white">Versao 0.9.0</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Configs;

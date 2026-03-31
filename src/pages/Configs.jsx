import { ChevronRight, CircuitBoard, SendHorizonal, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Configs = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-zinc-950 w-full flex items-center pl-4 h-18">
          <p className="text-2xl text-white">Configuraçoes</p>
        </div>
        <div className="flex flex-col justify-center items-center mt-16">
          <p
            className="border mt-1 p-1 border-white bg-zinc-900 w-86 rounded h-12 flex items-center justify-between cursor-pointer"
            onClick={() => navigate("/confirm-clear")}
          >
            <p className="flex gap-1 items-center">
              <Trash size={20} color="white" />
              <span className="text-white">|</span>
              <span className="text-white">Limpar dados</span>
            </p>
            <ChevronRight color="white" />
          </p>

          <p className="border mt-1 p-1 border-white bg-zinc-900 w-86 rounded h-12 flex items-center justify-between cursor-pointer">
            <p className="flex gap-1 items-center">
              <SendHorizonal size={20} color="white" />
              <span className="text-white">|</span>
              <span className="text-white">Feedback</span>
            </p>
            <ChevronRight color="white" />
          </p>

          <p className="border mt-1 p-1 border-white bg-zinc-900 w-86 rounded h-12 flex items-center justify-between cursor-pointer">
            <p className="flex gap-1 items-center">
              <CircuitBoard size={20} color="white" />
              <span className="text-white">|</span>
              <span className="text-white">Versao 0.0.9</span>
            </p>
          </p>
        </div>
      </div>
    </>
  );
};

export default Configs;

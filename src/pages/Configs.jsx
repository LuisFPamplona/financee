import { ChevronRight, CircuitBoard, SendHorizonal, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Configs = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="bg-zinc-900 w-full flex items-center justify-center h-14">
          <p className="text-2xl text-white">Configuraçoes</p>
        </div>
        <div className="flex flex-col justify-center items-center mt-16">
          <p
            className="border-b w-82 h-12 flex items-center justify-between cursor-pointer"
            onClick={() => navigate("/confirm-clear")}
          >
            <p className="flex gap-1 items-center">
              <Trash size={20} />
              <span>|</span>
              <span>Limpar dados</span>
            </p>
            <ChevronRight />
          </p>

          <p className="border-b w-82 h-12 flex items-center justify-between cursor-pointer">
            <p className="flex gap-1 items-center">
              <SendHorizonal size={20} />
              <span>|</span>
              <span>Feedback</span>
            </p>
            <ChevronRight />
          </p>

          <p className="border-b w-82 h-12 flex items-center justify-between cursor-pointer">
            <p className="flex gap-1 items-center">
              <CircuitBoard size={20} />
              <span>|</span>
              <span>Versao 0.0.9</span>
            </p>
          </p>
        </div>
      </div>
    </>
  );
};

export default Configs;

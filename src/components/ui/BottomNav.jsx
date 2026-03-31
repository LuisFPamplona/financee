import {
  Plus,
  Settings,
  ChartPie,
  ClipboardList,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50">
      <button
        className="flex flex-col items-center text-gray-500 text-xs hover:text-black transition cursor-pointer p-3 "
        onClick={() => navigate("/")}
      >
        <ClipboardList size={20} />
        <span></span>
      </button>

      <button
        className="flex flex-col items-center text-gray-500 text-xs hover:text-black transition cursor-pointer p-3"
        onClick={() => navigate("/calendar")}
      >
        <Calendar size={20} />
        <span></span>
      </button>

      <button
        className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center  shadow-md cursor-pointer p-3"
        onClick={() => navigate("/add-transaction")}
      >
        <Plus size={24} />
      </button>

      <button
        className="flex flex-col items-center text-gray-500 text-xs hover:text-black transition cursor-pointer p-3"
        onClick={() => navigate("/statistic")}
      >
        <ChartPie size={20} />
        <span></span>
      </button>

      <button className="flex flex-col items-center text-gray-500 text-xs hover:text-black transition cursor-pointer p-3">
        <Settings size={20} onClick={() => navigate("/configs")} />
        <span></span>
      </button>
    </nav>
  );
}

export default BottomNav;

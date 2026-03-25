import { Home, Search, Plus, Bell, User, ChartBarStacked } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BottomNav() {
  const navigate = useNavigate();
  return (
    <nav className="fixed bottom-0 left-0 w-full h-16 bg-white border-t border-gray-200 flex justify-around items-center z-50">
      <button
        className="flex flex-col items-center text-gray-500 text-xs hover:text-black transition cursor-pointer p-3 "
        onClick={() => navigate("/")}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <button className="flex flex-col items-center text-gray-500 text-xs hover:text-black transition cursor-pointer p-3">
        <ChartBarStacked size={20} />
        <span>Buscar</span>
      </button>

      <button
        className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center -mt-6 shadow-md cursor-pointer p-3"
        onClick={() => navigate("/AddTransaction")}
      >
        <Plus size={24} />
      </button>

      <button className="flex flex-col items-center text-gray-500 text-xs hover:text-black transition cursor-pointer p-3">
        <Bell size={20} />
        <span>Alertas</span>
      </button>

      <button className="flex flex-col items-center text-gray-500 text-xs hover:text-black transition cursor-pointer p-3">
        <User size={20} />
        <span>Perfil</span>
      </button>
    </nav>
  );
}

export default BottomNav;

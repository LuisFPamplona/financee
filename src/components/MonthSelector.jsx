import { ArrowLeft } from "lucide-react";
import { ArrowRight } from "lucide-react";

const MonthSelector = () => {
  return (
    <>
      <div className="flex justify-between items-center pl-2 pr-2 border-t border-b h-10">
        <p
          className="hover:scale-105 active:scale-95 cursor-pointer transition-all p-2"
          onClick={() => {
            window.alert("Essa funçao está em desenvolvimento");
          }}
        >
          <ArrowLeft />
        </p>
        <p className="font-bold text-2xl">Janeiro</p>
        <p
          className="hover:scale-115 active:scale-95 cursor-pointer transition-all p-2"
          onClick={() => {
            window.alert("Essa funçao está em desenvolvimento");
          }}
        >
          <ArrowRight />
        </p>
      </div>
    </>
  );
};

export default MonthSelector;

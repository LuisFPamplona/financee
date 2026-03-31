import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { useState } from "react";

const TypeInput = ({ handleChange, incomeCheck, outcomeCheck, type }) => {
  const [incomeStyle, setIncomeStyle] = useState("bg-green-400");
  const [outcomeStyle, setOutcomeStyle] = useState("bg-red-400");

  const incomeStyleSelected = "bg-green-600 scale-80 border-4";
  const outcomeStyleSelected = "bg-red-600 scale-80 border-4";

  return (
    <>
      <div className="bg-zinc-900 border border-gray-400 p-3 w-82 h-18 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex gap-6 items-center justify-center mt-2">
        <div
          className={`flex justify-center items-center gap-1 border cursor-pointer p-2 w-16 ${incomeStyle} rounded`}
          onClick={() => {
            handleChange("income");
            setIncomeStyle(incomeStyleSelected);
            setOutcomeStyle("bg-red-400");
          }}
        >
          <BanknoteArrowUp />
        </div>

        <div
          className={`flex justify-center items-center gap-1 border cursor-pointer p-2 w-16 ${outcomeStyle} rounded`}
          onClick={() => {
            handleChange("outcome");
            setOutcomeStyle(outcomeStyleSelected);
            setIncomeStyle("bg-green-400");
          }}
        >
          <BanknoteArrowDown />
        </div>
      </div>
    </>
  );
};

export default TypeInput;

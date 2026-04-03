import { Check, CornerUpLeft, X } from "lucide-react";
import { formatCurrency } from "../../../utils/formatCurrency";
import { formatValue } from "../../../utils/formatValue";
import { useState } from "react";

const InstallmentSelector = ({
  setInstallmentInput,
  setSelectedInstallment,
  value,
  selectedInstallment,
}) => {
  const [uiInstallment, setUiInstallment] = useState(1);

  let installments = [];
  for (let i = 1; i <= 12; i++) {
    installments.push(i);
  }

  const list = installments.map((item, index) => {
    return (
      <div
        className="w-12 h-12 bg-zinc-900 border border-gray-400 rounded-xl flex justify-center items-center cursor-pointer active:scale-98 hover:scale-102 transition-all shadow-md"
        onClick={() => {
          setUiInstallment(item);
        }}
      >
        <span className="text-white font-bold">{item}x</span>
      </div>
    );
  });
  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="w-full h-18 bg-zinc-950 flex justify-between items-center pl-2 pr-2">
          <p className="text-2xl text-white">Selecione o parcelamento</p>
          <button
            className="cursor-pointer bg-gray-100 p-2 h-10 w-10 rounded-full hover:scale-102 active:scale-98"
            onClick={() => {
              if (selectedInstallment) {
                setUiInstallment(selectedInstallment);
              }
              setInstallmentInput(false);
            }}
          >
            <CornerUpLeft />
          </button>
        </div>
        <div className="h-28 w-82 bg-zinc-900 border border-gray-400 rounded-xl mt-4 flex flex-col items-center justify-center gap-4">
          <div className="text-white font-bold text-2xl">
            {value && <p>{formatCurrency(formatValue(value) * 1)}</p>}
            {!value && <p>{formatCurrency(0)}</p>}
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-white font-bold text-2xl">{uiInstallment}x</p>
            <p className="text-white font-bold text-3xl">
              {formatCurrency(formatValue(value) / uiInstallment)}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center mt-8">
          <div className="grid grid-cols-6 gap-2 w-82">{list}</div>
        </div>
        <div className="w-82 flex justify-between items-center mt-16">
          <button
            className="bg-red-400 rounded-2xl p-1 active:scale-95 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              if (selectedInstallment) {
                setUiInstallment(selectedInstallment);
              }
              setInstallmentInput(false);
            }}
          >
            <X width={48} height={48} color="white" />
          </button>
          <button
            className="bg-green-600 rounded-2xl p-1 active:scale-95 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              setInstallmentInput(false);
              setSelectedInstallment(uiInstallment);
            }}
          >
            <Check color="white" width={48} height={48} />
          </button>
        </div>
      </div>
    </>
  );
};

export default InstallmentSelector;

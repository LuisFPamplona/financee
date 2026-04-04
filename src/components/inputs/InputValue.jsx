import { ChevronsRight } from "lucide-react";
import InstallmentSelector from "../features/InstallmentSelector";
import { useEffect } from "react";

const InputValue = ({
  valueText,
  valueInput,
  setValueText,
  defaultValue,
  setInstallmentInput,
  selectedInstallment,
}) => {
  const formatValue = (value) => {
    const converted = String(value);
    if (converted.startsWith("-")) {
      return Number(converted.slice(1));
    } else {
      return value;
    }
  };

  useEffect(() => {
    setValueText(defaultValue);
  }, []);
  return (
    <>
      <div className="flex items-center mt-2 gap-1">
        <div className="flex items-baseline h-13 gap-1 border border-gray-400 bg-zinc-900 p-3 w-57 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 ">
          <p className="text-white font-bold text-sm">R$</p>
          <input
            type="text"
            value={valueText}
            onChange={(e) => {
              let val = e.target.value;
              val = val.replace(/[^0-9,]/g, "");
              const parts = val.split(",");
              if (parts.length > 2) {
                val = parts[0] + "," + parts.slice(1).join("");
              }
              if (val.includes(",")) {
                const [inteiro, decimal] = val.split(",");
                val = inteiro + "," + decimal.slice(0, 2);
              }
              setValueText(val);
            }}
            placeholder="0,00"
            className="outline-0 text-xl text-white font-bold"
            ref={valueInput}
            inputMode="numeric"
          />
        </div>
        <div
          className="w-24 h-13 bg-zinc-900 border border-gray-400 rounded-xl flex items-center justify-between pl-1 pr-1 cursor-pointer"
          onClick={() => {
            if (valueText) {
              setInstallmentInput(true);
            } else {
              console.log(valueText);
              console.log("Value cannot be null");
            }
          }}
        >
          {!selectedInstallment && (
            <p className="text-white font-bold">Parcela</p>
          )}
          {selectedInstallment && (
            <p className="text-white font-bold text-2xl w-full text-center">
              {selectedInstallment}x
            </p>
          )}
          <p>
            <ChevronsRight color="white" />
          </p>
        </div>
      </div>
    </>
  );
};
export default InputValue;

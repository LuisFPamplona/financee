const InputValue = ({ valueText, valueInput, setValueText, defaultValue }) => {
  return (
    <>
      <div className="flex items-baseline gap-1 border border-gray-400  mt-2 bg-zinc-900 p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 ">
        <p className="text-white font-bold text-sm">R$</p>

        <input
          type="text"
          value={valueText}
          defaultValue={defaultValue}
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
    </>
  );
};
export default InputValue;

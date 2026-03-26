import { useRef, useEffect } from "react";

const DateInput = ({
  setDayInput,
  setMonthInput,
  setYearInput,
  defaultDate,
}) => {
  const dayInput = useRef();
  const monthInput = useRef();
  const yearInput = useRef();

  useEffect(() => {
    if (defaultDate) {
      setDayInput(defaultDate.slice(0, 2));
      setMonthInput(defaultDate.slice(3, 5));
      setYearInput(defaultDate.slice(6));
    }
  }, [defaultDate]);
  return (
    <>
      <div className="bg-white pb-2 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-center items-center gap-2">
        <span>Data da transaçao</span>
        <div className="flex gap-4">
          <div className="border w-16 h-17 rounded-2xl">
            <span className="text-center flex justify-center text-gray-500">
              Dia
            </span>
            <input
              onChange={() => {
                let val = dayInput.current.value;

                val = val.replace(/\D/g, ""); // remove tudo que não for número
                val = val.slice(0, 2); // limita a 2 caracteres

                dayInput.current.value = val; // atualiza o input
                setDayInput(val);
              }}
              ref={dayInput}
              defaultValue={defaultDate ? defaultDate.slice(0, 2) : ""}
              type="text"
              inputMode="numeric"
              className="w-16 p-1 outline-0 text-center text-2xl"
              maxLength={2}
            />
          </div>
          <div className="border w-16 h-17 rounded-2xl">
            <span className="text-center flex justify-center text-gray-500">
              Mes
            </span>
            <input
              onChange={() => {
                let val = monthInput.current.value;

                val = val.replace(/\D/g, "");
                val = val.slice(0, 2);

                monthInput.current.value = val;
                setMonthInput(val);
              }}
              ref={monthInput}
              defaultValue={defaultDate ? defaultDate.slice(3, 5) : ""}
              type="text"
              inputMode="numeric"
              className="w-16 p-1 outline-0 text-center text-2xl"
              maxLength={2}
            />
          </div>
          <div className="border w-16 h-17 rounded-2xl">
            <span className="text-center flex justify-center text-gray-500">
              Ano
            </span>
            <input
              onChange={() => {
                let val = yearInput.current.value;

                val = val.replace(/\D/g, "");
                val = val.slice(0, 4);

                yearInput.current.value = val;
                setYearInput(val);
              }}
              ref={yearInput}
              defaultValue={defaultDate ? defaultDate.slice(6) : ""}
              type="text"
              inputMode="numeric"
              className="w-16 p-1 outline-0 text-center text-2xl"
              maxLength={4}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DateInput;

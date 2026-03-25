import { useRef } from "react";

const DateInput = ({ setDayInput, setMonthInput, setYearInput }) => {
  const dayInput = useRef();
  const monthInput = useRef();
  const yearInput = useRef();
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
                setDayInput(dayInput.current.value);
              }}
              ref={dayInput}
              type="text"
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
                setMonthInput(monthInput.current.value);
              }}
              ref={monthInput}
              type="text"
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
                setYearInput(yearInput.current.value);
              }}
              ref={yearInput}
              type="text"
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

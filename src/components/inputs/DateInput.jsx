import { getToday } from "../../../utils/getToday";

const DateInput = ({
  dayInput,
  monthInput,
  yearInput,
  defaultDate,
  setDayInput,
  setMonthInput,
  setYearInput,
}) => {
  const setDayAsToday = (day, month, year) => {
    dayInput.current.value = day;
    setDayInput(day);

    monthInput.current.value = month;
    setMonthInput(month);

    yearInput.current.value = year;
    setYearInput(year);

    return console.log(day, month, year);
  };

  return (
    <>
      <div className="bg-zinc-900 border border-gray-400 pb-2 w-82 mt-2 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-center items-center gap-2">
        <span className="w-full pl-3 text-white text-sm font-bold pt-1">
          Data da transaçao
        </span>
        <div className="flex gap-4 items-center">
          <div className="border w-16 h-17 rounded-2xl bg-zinc-800 font-bold">
            <span className="text-center flex justify-center text-white text-sm font-bold">
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
              defaultValue={
                defaultDate.day ? defaultDate.day.padStart(2, "0") : ""
              }
              type="text"
              inputMode="numeric"
              className="w-16 p-1 outline-0 text-center text-2xl text-white"
              maxLength={2}
            />
          </div>
          <div className="border w-16 h-17 rounded-2xl bg-zinc-800 font-bold">
            <span className="text-center flex justify-center text-white text-sm font-bold">
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
              defaultValue={defaultDate.month ? defaultDate.month : ""}
              type="text"
              inputMode="numeric"
              className="w-16 p-1 outline-0 text-center text-2xl text-white"
              maxLength={2}
            />
          </div>
          <div className="border w-16 h-17 rounded-2xl bg-zinc-800 font-bold">
            <span className="text-center flex justify-center text-white text-sm font-bold">
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
              defaultValue={defaultDate.year ? defaultDate.year : ""}
              type="text"
              inputMode="numeric"
              className="w-16 p-1 outline-0 text-center text-2xl text-white"
              maxLength={4}
            />
          </div>
          <div>
            <button
              className="border bg-zinc-800  rounded shadow-2xl p-1 active:scale-98 transition-all cursor-pointer"
              onClick={() => {
                const date = getToday();
                setDayAsToday(date.day, date.month, date.year);
              }}
            >
              <span className="text-white font-bold">Hoje</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DateInput;

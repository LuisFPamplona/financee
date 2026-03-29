import { ArrowUpDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import TransactionItem from "../components/features/TransactionItem";
import NothingHere from "../components/ui/NothingHere";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";

const Calendar = ({ transactions }) => {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState("start");

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const actualMonth = new Date().getMonth();
  const actualYear = new Date().getFullYear();

  const [selectedMonth, setSelectedMonth] = useState(actualMonth);
  const [selectedYear, setSelectedYear] = useState(actualYear);

  const list = transactions.filter(
    (element) =>
      Number(element.date.month) - 1 == selectedMonth &&
      Number(element.date.year) == selectedYear,
  );

  const totals = list.reduce(
    (acc, t) => {
      if (t.type === "income") {
        acc.income += t.value;
      } else if (t.type === "outcome") {
        acc.outcome += Math.abs(t.value);
      }

      return acc;
    },
    { income: 0, outcome: 0 },
  );

  const sortedByStart = transactions
    .filter(
      (element) =>
        Number(element.date.month) - 1 == selectedMonth &&
        Number(element.date.year) == selectedYear,
    )
    .sort((a, b) => Number(a.date.day) - Number(b.date.day));

  const sortedByEnd = transactions
    .filter(
      (element) =>
        Number(element.date.month) - 1 == selectedMonth &&
        Number(element.date.year) == selectedYear,
    )
    .sort((a, b) => Number(b.date.day) - Number(a.date.day));

  const setMonth = (month, oper) => {
    switch (oper) {
      case "increase":
        if (month < 11) {
          return month + 1;
        } else {
          setSelectedYear(selectedYear + 1);
          return 0;
        }
        break;
      case "decrease":
        if (month > 0) {
          return month - 1;
        } else {
          setSelectedYear(selectedYear - 1);
          return 11;
        }
        break;
    }
  };

  const listFromStart = sortedByStart.map((item, index) => {
    return (
      <div
        className="w-full cursor-pointer hover:scale-105 active:scale-95 transition-all"
        key={index}
        onClick={() => navigate(`/transaction/${item.id}`)}
      >
        <TransactionItem
          value={item.value}
          date={item.date}
          name={item.name}
          type={item.type}
          category={item.category}
        />
      </div>
    );
  });

  const listFromEnd = sortedByEnd.map((item, index) => {
    return (
      <div
        className="w-full cursor-pointer hover:scale-105 active:scale-95 transition-all"
        key={index}
        onClick={() => navigate(`/transaction/${item.id}`)}
      >
        <TransactionItem
          value={item.value}
          date={item.date}
          name={item.name}
          type={item.type}
          category={item.category}
        />
      </div>
    );
  });

  const changeSort = (sort) => {
    if (sort == "start") {
      return "end";
    }

    if (sort == "end") {
      return "start";
    }
  };

  return (
    <>
      <section className="flex flex-col w-full items-center  justify-center gap-2 ">
        <div className="flex items-center justify-between p-4 bg-zinc-900 w-full h-18">
          <button
            className="bg-white rounded active:scale-98 cursor-pointer"
            onClick={() => {
              setSelectedMonth(() => {
                const newMonth = setMonth(selectedMonth, "decrease");
                return newMonth;
              });
            }}
          >
            <ChevronLeft size={30} />
          </button>
          <p className="text-3xl font-bold text-white flex flex-col justify-center items-center">
            {months[selectedMonth]}
            <span className="text-sm">{selectedYear}</span>
          </p>
          <button
            className="bg-white rounded active:scale-98 cursor-pointer"
            onClick={() => {
              setSelectedMonth(() => {
                const newMonth = setMonth(selectedMonth, "increase");
                return newMonth;
              });
            }}
          >
            <ChevronRight size={30} />
          </button>
        </div>

        <div className="w-92 flex justify-between h-18 items-center">
          <div className="mt-2 flex justify-between gap-2 pr-3.5 pl-3.5 text-center">
            <div className=" bg-green-400 p-3 w-32 rounded-xl">
              <span className="font-bold">+</span>
              <span className="font-bold">{formatCurrency(totals.income)}</span>
            </div>

            <div className=" bg-red-400 p-3 w-32 rounded-xl">
              <span className="font-bold">-</span>
              <span className="font-bold">
                {formatCurrency(totals.outcome)}
              </span>
            </div>
          </div>

          <button
            className="p-1 active:scale-98 cursor-pointer transition-all flex flex-col justify-center items-center mt-3"
            onClick={() => {
              const newSort = changeSort(sortType);
              setSortType(newSort);
            }}
          >
            <ArrowUpDown size={30} />
            <span className="text-sm">Ordenar</span>
          </button>
        </div>

        <div className="w-full flex items-center justify-center">
          {sortType === "start" && <div className="pb-24">{listFromStart}</div>}
          {sortType === "end" && <div className="pb-24">{listFromEnd}</div>}
          {listFromStart.length < 1 && (
            <div className="flex flex-col gap-70">
              <NothingHere />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Calendar;

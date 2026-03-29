import { BrushCleaning, ListPlus, Wind } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency.js";
import EyeButton from "../components/features/EyeButton.jsx";

const Statistic = ({ transactions, visible, setVisible }) => {
  const grouped = transactions.reduce((acc, t) => {
    const category = t.category;

    if (!acc[category]) {
      acc[category] = 0;
    }

    acc[category] += Math.abs(t.value);

    return acc;
  }, {});

  const chartData = Object.keys(grouped).map((key) => ({
    name: key,
    value: grouped[key],
  }));

  const totals = transactions.reduce(
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

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
    "#f59e0b",
    "#a855f7",
    "#14b8a6",
  ];
  return (
    <>
      <section className="flex  flex-col items-center gap-2 h-140">
        <div className="flex items-center justify-between p-4 bg-zinc-900 w-full h-18">
          <p className="text-2xl text-white">Estatísticas</p>
          <p>
            <EyeButton visible={visible} setVisible={setVisible} />
          </p>
        </div>
        <div className="border w-[90%] h-120 flex flex-col justify-center items-center rounded-xl outline-0 shadow-xl transition-shadow duration-300 border-stone-400">
          <div className="mt-2 flex justify-between gap-2 pr-3.5 pl-3.5 text-center">
            <div className="flex items-center gap-1 bg-green-400 p-3 w-41 rounded-xl">
              <span className="font-bold">+</span>
              <span className="font-bold">
                {visible && <span>{formatCurrency(totals.income)}</span>}
                {!visible && (
                  <div className="flex items-center gap-1">
                    <span>R$</span>
                    <div className="bg-green-300 w-24 h-4" />
                  </div>
                )}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-red-400 p-3 w-41 rounded-xl">
              <span className="font-bold">-</span>
              <span className="font-bold">
                {visible && <span>{formatCurrency(totals.outcome)}</span>}
                {!visible && (
                  <div className="flex items-center gap-1">
                    <span>R$</span>
                    <div className="bg-red-300 w-24 h-4" />
                  </div>
                )}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 h-screen ">
            <div className="mt-2 flex flex-col">
              {chartData.map((entry, index) => (
                <div
                  key={index}
                  className="flex border items-center gap-4 border-gray-400 mt-2 bg-white p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-100 active:scale-98 "
                >
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm">{entry.name}</span>
                  <span className="text-1xl ml-auto">
                    {visible && <p>{formatCurrency(entry.value)}</p>}
                    {!visible && (
                      <div className="flex items-center gap-1">
                        <span>R$</span>
                        <div className="bg-neutral-200 w-18 h-4" />
                      </div>
                    )}
                  </span>
                  <span className="p-1">
                    <ListPlus color="gray" />
                  </span>
                </div>
              ))}
            </div>
            <div>
              {!chartData[0] && (
                <div className="flex flex-col items-center text-2xl mt-24">
                  <p>Nada pra mostrar</p>
                  <p className="flex">
                    <BrushCleaning />
                    <Wind />
                  </p>
                  <span className="text-sm mt-22">
                    <p>Adicione uma transação para ver suas estatísticas.</p>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Statistic;

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
        <div className="flex items-center justify-between p-4 bg-zinc-950 w-full h-18">
          <p className="text-2xl text-white">Estatísticas</p>
          <p>
            <EyeButton
              visible={visible}
              setVisible={setVisible}
              color={"white"}
            />
          </p>
        </div>
        <div className=" w-[90%] h-115 flex flex-col justify-center items-center rounded-xl outline-0">
          <div className="w-85 mt-2 flex justify-between h-14 items-center">
            <div className="flex justify-between w-full ">
              <div className="bg-green-400 w-36 h-10 rounded-xl ml-2 flex justify-center items-center">
                <span className="font-bold text-sm">+</span>
                <span className="font-bold text-sm">
                  {visible && <span>{formatCurrency(totals.income)}</span>}
                  {!visible && (
                    <span>
                      <div>
                        <p className="w-24  flex items-center gap-2">
                          R$ <span className="bg-green-300 w-48 h-5 mt-1" />
                        </p>
                      </div>
                    </span>
                  )}
                </span>
              </div>

              <div className="bg-red-400 w-36 h-10 rounded-xl mr-2 flex justify-center items-center">
                <span className="font-bold text-sm">-</span>
                <span className="font-bold text-sm">
                  {visible && <span>{formatCurrency(totals.outcome)}</span>}
                  {!visible && (
                    <span>
                      <div>
                        <p className="w-24 flex items-center gap-2">
                          R$ <span className="bg-red-300 w-48 h-5 mt-1" />
                        </p>
                      </div>
                    </span>
                  )}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 h-screen ">
            <div className="mt-2 flex flex-col">
              {chartData.map((entry, index) => (
                <div
                  key={index}
                  className="flex border items-center gap-4 border-gray-400 mt-2 bg-zinc-900 p-3 w-82 rounded-xl outline-0 shadow-md transition-all duration-300 cursor-pointer hover:scale-100 active:scale-98 "
                >
                  <div
                    className="w-4 h-4 rounded-sm"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-white font-bold">
                    {entry.name}
                  </span>
                  <span className="text-1xl ml-auto">
                    {visible && (
                      <p className="text-white font-bold">
                        {formatCurrency(entry.value)}
                      </p>
                    )}
                    {!visible && (
                      <div className="flex items-center gap-1">
                        <span>R$</span>
                        <div className="bg-neutral-700 w-18 h-4" />
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

import { formatCurrency } from "../../../utils/formatCurrency.js";

const TransactionItem = ({ value, date, name, type, category, visible }) => {
  const typeColor = type === "income" ? "text-green-400" : "text-red-400";

  return (
    <>
      <div
        className={`flex border items-center gap-4 border-gray-400 mt-2 bg-zinc-900 p-3 w-82 rounded-xl outline-0 shadow-md hover:scale-102 transition-all duration-300 cursor-pointer  active:scale-98`}
      >
        <div className="flex justify-between items-center w-full ">
          <div>
            <p className="text-left text-white font-bold">{name}</p>
            <p className="text-sm text-neutral-300">{category}</p>
          </div>

          <div className="flex flex-col gap-1">
            <div className={`font-bold ${typeColor} tracking-wide`}>
              {visible && <span>{formatCurrency(value)}</span>}
              {!visible && (
                <div>
                  <p className="flex items-center gap-1">
                    R$ <span className="bg-neutral-700 w-18 h-5 mt-1" />
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="text-sm text-right text-neutral-300">
                {date.day.padStart(2, "0")}/{date.month}/{date.year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionItem;

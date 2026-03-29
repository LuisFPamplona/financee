import { formatCurrency } from "../../../utils/formatCurrency.js";

const TransactionItem = ({ value, date, name, type, category }) => {
  const typeColor = type === "income" ? "text-green-400" : "text-red-400";

  return (
    <>
      <div
        className={`border flex items-center justify-between gap-4 max-h-20 w-92 mt-2`}
      >
        <div className="flex flex-col justify-center items-center w-full ">
          <p className="border-b w-full bg-white border-t text-center h-6">
            {name}
          </p>
          <div
            className={`flex border-b items-center bg-gray-800 justify-between p-4 relative  h-14 w-full`}
          >
            <div>
              <p className=" text-white text-sm">{category}</p>
              <p className=" text-white text-sm">
                {date.day}/{date.month}/{date.year}
              </p>
            </div>
            <div className="flex text-white items-baseline gap-1">
              <p className={`text-2xl ${typeColor} tracking-wide`}>
                {formatCurrency(value)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionItem;

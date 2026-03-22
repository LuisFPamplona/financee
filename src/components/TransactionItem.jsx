import { Trash, Trash2, X } from "lucide-react";

const TransactionItem = ({ value, date, name, type, id, onDelete }) => {
  const typeColor = type === "income" ? "bg-green-400" : "bg-red-400";

  return (
    <>
      <div
        className={`border p-1 m-1 ${typeColor} flex items-center justify-between gap-4`}
      >
        <div className="flex flex-col justify-center items-center min-w-[90%] max-w-[90%]">
          <p>{name}</p>
          <p>{"R$" + value}</p>
          <p>{date}</p>
        </div>
        <div>
          <button
            className="bg-white border rounded-2xl p-1 active:scale-95 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              onDelete(id);
            }}
          >
            <Trash2 width={16} height={16} />
          </button>
        </div>
      </div>
    </>
  );
};

export default TransactionItem;

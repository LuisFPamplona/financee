import { CalendarDays, Check, X } from "lucide-react";

const AddTransaction = ({ balance, setBalance }) => {
  return (
    <>
      <section className="flex flex-col items-center justify-between gap-2 mt-8">
        <div className="flex items-center justify-center border p-1 rounded-2xl">
          <p className="text-3xl">R$</p>
          <input
            type="number"
            placeholder="0,00"
            className="h-12 text-3xl w-42 text-center outline-0"
          />
        </div>
        <div>categoria</div>
        <div>
          <CalendarDays />
        </div>
        <div className="flex">
          <button className="bg-green-400 rounded-2xl p-1 active:scale-95">
            <Check />
          </button>
          <button className="bg-red-400 rounded-2xl p-1 active:scale-95">
            <X />
          </button>
        </div>
      </section>
    </>
  );
};

export default AddTransaction;

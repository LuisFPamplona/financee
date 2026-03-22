import { CalendarDays, Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTransaction } from "../../services/storage";

const AddTransaction = ({ transactions, setTransactions }) => {
  const incomeInput = useRef();
  const outcomeInput = useRef();
  const valueInput = useRef("");
  const dateInput = useRef();
  const nameInput = useRef("");

  const [incomeCheck, setIncomeCheck] = useState();
  const [outcomeCheck, setOutcomeCheck] = useState();
  const [transactionType, setTransactionType] = useState();
  const [valueText, setValueText] = useState();

  const navigate = useNavigate();

  const sendTransaction = (newTransaction) => {
    let valueText = newTransaction.value;
    valueText = valueText.replace(",", ".");

    if (newTransaction.type == "outcome") {
      const value = "-" + valueText;

      const data = {
        id: newTransaction.id,
        name: newTransaction.name,
        value: Number(value),
        type: newTransaction.type,
        date: newTransaction.date,
      };

      setTransactions((prev) => {
        const newList = [...prev, data];
        saveTransaction(newList);

        return newList;
      });
      navigate("/");
    } else {
      const data = {
        id: newTransaction.id,
        name: newTransaction.name,
        value: Number(valueText),
        type: newTransaction.type,
        date: newTransaction.date,
      };
      setTransactions((prev) => {
        const newList = [...prev, data];
        saveTransaction(newList);

        return newList;
      });
      saveTransaction(transactions);
      navigate("/");
    }
  };

  return (
    <>
      <section className="flex flex-col items-center justify-between gap-2 mt-8">
        <div>
          <input
            type="text"
            className="border text-center"
            placeholder="Descrição"
            ref={nameInput}
          />
        </div>
        <div className="flex items-center justify-center border p-1 rounded-2xl">
          <p className="text-3xl">R$</p>
          <input
            type="text"
            value={valueText}
            onChange={(e) => {
              let val = e.target.value;

              val = val.replace(/[^0-9,]/g, "");

              const parts = val.split(",");
              if (parts.length > 2) {
                val = parts[0] + "," + parts.slice(1).join("");
              }

              if (val.includes(",")) {
                const [inteiro, decimal] = val.split(",");
                val = inteiro + "," + decimal.slice(0, 2);
              }

              setValueText(val);
            }}
            placeholder="0,00"
            className="h-12 text-3xl w-42 text-center outline-0"
            ref={valueInput}
          />
        </div>
        <div className="flex gap-4">
          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              ref={incomeInput}
              checked={incomeCheck}
              onClick={() => {
                const isChecked = incomeInput.current.checked;
                if (isChecked) {
                  setIncomeCheck(true);
                  setOutcomeCheck(false);
                  setTransactionType("income");
                }
              }}
            />
            Entrada
          </div>
          <div className="flex justify-center items-center gap-1">
            <input
              type="checkbox"
              ref={outcomeInput}
              checked={outcomeCheck}
              onClick={() => {
                const isChecked = outcomeInput.current.checked;
                if (isChecked) {
                  setIncomeCheck(false);
                  setOutcomeCheck(true);
                  setTransactionType("outcome");
                }
              }}
            />
            Saída
          </div>
        </div>
        <div className="flex justify-center items-center gap-1 border p-1 pl-1.5 pr-1.5">
          <input type="date" ref={dateInput} />
        </div>
        <div className="flex gap-4">
          <button
            className="bg-green-400 rounded-2xl p-1 active:scale-95 cursor-pointer hover:scale-105 transition-all"
            onClick={() => {
              if (
                valueInput.current.value == "" ||
                valueInput.current.value < 0
              ) {
                console.log("VALOR INSERIDO INVALIDO");
              } else if (transactionType == undefined) {
                console.log("TIPO NAO SELECIONADO");
              } else if (dateInput.current.value == "") {
                console.log("DATA NAO SELECIONADA");
              } else if (nameInput.current.value.trim() == "") {
                console.log("NOME NAO INFORMADO");
              } else {
                const data = {
                  id: Date.now(),
                  name: nameInput.current.value,
                  value: valueInput.current.value,
                  type: transactionType,
                  date: dateInput.current.value,
                };

                sendTransaction(data);
              }
            }}
          >
            <Check />
          </button>
          <button
            className="bg-red-400 rounded-2xl p-1 active:scale-95 cursor-pointer hover:scale-105 transition-all"
            onClick={() => navigate("/")}
          >
            <X />
          </button>
        </div>
      </section>
    </>
  );
};

export default AddTransaction;

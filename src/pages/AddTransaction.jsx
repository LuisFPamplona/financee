import { Check, ChevronsRight, Edit, X } from "lucide-react";
import { use, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTransaction } from "../../services/storage";
import DateInput from "../components/DateInput";
import CategoryList from "./CategoryList";

const AddTransaction = ({ transactions, setTransactions }) => {
  const incomeInput = useRef();
  const outcomeInput = useRef();
  const valueInput = useRef("");
  const nameInput = useRef("");

  const [dayInput, setDayInput] = useState();
  const [monthInput, setMonthInput] = useState();
  const [yearInput, setYearInput] = useState();
  const [categoryInput, setCategoryInput] = useState(false);
  const [categoryDisplay, setCategoryDisplay] = useState("hidden");
  const [mainDisplay, setMainDisplay] = useState("");
  const [selectedCategory, setSelectedCategory] = useState();

  const [incomeCheck, setIncomeCheck] = useState();
  const [outcomeCheck, setOutcomeCheck] = useState();
  const [transactionType, setTransactionType] = useState();
  const [valueText, setValueText] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    if (categoryInput == true) {
      setCategoryDisplay("");
      setMainDisplay("hidden");
    } else if (categoryInput == false) {
      setCategoryDisplay("hidden");
      setMainDisplay("");
    }
  }, [categoryInput]);

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
        category: selectedCategory,
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
        category: selectedCategory,
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
      <div className={`${categoryDisplay}`}>
        <CategoryList
          setCategoryInput={setCategoryInput}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <section className={`relative h-screen ${mainDisplay}`}>
        <div className="border w-[90%] flex flex-col justify-center items-center absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl outline-0 shadow-xl transition-shadow duration-300 border-stone-400">
          <div className="w-82 flex justify-center mt-2 mb-2">
            <span className="text-2xl">Nova transaçao</span>
          </div>
          <div className="w-82">
            <input
              type="text"
              className="bg-white p-3 w-full rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 mt-2"
              placeholder="Nome"
              ref={nameInput}
            />
          </div>

          <div className="flex items-baseline gap-1  mt-2 bg-white p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 ">
            <p className="bg-white">R$</p>

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
              className="outline-0 text-xl"
              ref={valueInput}
            />
          </div>

          <div
            className="bg-white p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex gap-6 items-center justify-center mt-2 cursor-pointer"
            onClick={() => {
              setCategoryInput(true);
            }}
          >
            <div className="flex w-full justify-between">
              {!selectedCategory && <p>Categorias</p>}
              {!selectedCategory && <ChevronsRight />}
              {selectedCategory && (
                <div className="flex justify-between w-full relative">
                  {selectedCategory} <Edit />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex gap-6 items-center justify-center mt-2">
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

          <div className="mt-2">
            <DateInput
              setDayInput={setDayInput}
              setMonthInput={setMonthInput}
              setYearInput={setYearInput}
            />
          </div>

          <div className="flex w-82 justify-between mt-2 mb-2">
            <button
              className="bg-gray-400 rounded-2xl p-1 active:scale-95 cursor-pointer hover:scale-105 transition-all"
              onClick={() => navigate("/")}
            >
              <X width={48} height={48} />
            </button>
            <button
              className="bg-gray-800 rounded-2xl p-1 active:scale-95 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                if (
                  valueInput.current.value == "" ||
                  valueInput.current.value < 0
                ) {
                  console.log("VALOR INSERIDO INVALIDO");
                } else if (transactionType == undefined) {
                  console.log("TIPO NAO SELECIONADO");
                } else if (
                  dayInput == "" ||
                  monthInput == "" ||
                  yearInput == ""
                ) {
                  console.log("DATA NAO SELECIONADA");
                } else if (nameInput.current.value.trim() == "") {
                  console.log("NOME NAO INFORMADO");
                } else {
                  const data = {
                    id: Date.now(),
                    name: nameInput.current.value,
                    value: valueInput.current.value,
                    type: transactionType,
                    date: dayInput + "/" + monthInput + "/" + yearInput,
                  };
                  sendTransaction(data);
                }
              }}
            >
              <Check color="white" width={48} height={48} />
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddTransaction;

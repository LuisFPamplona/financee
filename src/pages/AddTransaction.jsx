import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTransaction } from "../../services/storage";
import DateInput from "../components/inputs/DateInput";
import CategoryList from "./CategoryList";
import InputName from "../components/inputs/InputName";
import InputValue from "../components/inputs/InputValue";
import CategoryInput from "../components/inputs/CategoryInput";

const AddTransaction = ({ transactions, setTransactions }) => {
  const incomeInput = useRef();
  const outcomeInput = useRef();
  const valueInput = useRef("");
  const nameInput = useRef("");

  const dayInputRef = useRef();
  const monthInputRef = useRef();
  const yearInputRef = useRef();

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

      <section className={`relative h-140 ${mainDisplay}`}>
        <div className="border w-[90%] flex flex-col justify-center items-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl outline-0 shadow-xl transition-shadow duration-300 border-stone-400">
          <div className="w-82 flex justify-center mt-2 mb-2">
            <span className="text-2xl">Nova transaçao</span>
          </div>
          <InputName nameInput={nameInput} />

          <InputValue
            valueText={valueText}
            valueInput={valueInput}
            setValueText={setValueText}
          />

          <CategoryInput
            setCategoryInput={setCategoryInput}
            selectedCategory={selectedCategory}
          />

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

          <DateInput
            dayInput={dayInputRef}
            monthInput={monthInputRef}
            yearInput={yearInputRef}
            setDayInput={setDayInput}
            setMonthInput={setMonthInput}
            setYearInput={setYearInput}
            defaultDate=""
          />

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
                    date: {
                      day: dayInput,
                      month: monthInput,
                      year: yearInput,
                    },
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

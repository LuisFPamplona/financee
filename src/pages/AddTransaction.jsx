import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveTransaction } from "../../services/storage";
import DateInput from "../components/inputs/DateInput";
import CategoryList from "./CategoryList";
import InputName from "../components/inputs/InputName";
import InputValue from "../components/inputs/InputValue";
import CategoryInput from "../components/inputs/CategoryInput";
import TypeInput from "../components/inputs/TypeInput";
import { validateTransaction } from "../../services/validateTransaction";

const AddTransaction = ({ transactions, setTransactions }) => {
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
  const [type, setType] = useState(null);
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

  const handleChange = (value) => {
    setType(() => {
      if (value === type) {
        return value;
      } else if (value !== type) {
        return value;
      }
    });
  };

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
        category: newTransaction.category,
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

      <section
        className={`flex flex-col justify-center items-center ${mainDisplay}`}
      >
        <div className="w-full h-18 bg-zinc-950 pl-2 flex items-center mb-2">
          <span className="text-2xl text-white">Nova transaçao</span>
        </div>
        <div className="w-92 flex flex-col justify-center items-center rounded-xl">
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

          <TypeInput handleChange={handleChange} type={type} />

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
              className="bg-red-400 rounded-2xl p-1 active:scale-95 cursor-pointer hover:scale-105 transition-all"
              onClick={() => navigate("/")}
            >
              <X width={48} height={48} color="white" />
            </button>
            <button
              className="bg-green-600 rounded-2xl p-1 active:scale-95 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                const data = {
                  id: Date.now(),
                  name: nameInput.current.value,
                  value: valueInput.current.value,
                  type: type,
                  date: {
                    day: dayInput,
                    month: monthInput,
                    year: yearInput,
                  },
                  category: selectedCategory,
                };

                const isDataValid = validateTransaction(data);

                if (isDataValid.success) {
                  console.log(isDataValid.data);
                  sendTransaction(data);
                } else {
                  console.log("Error: " + isDataValid.error);
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

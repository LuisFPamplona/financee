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
import InstallmentSelector from "../components/features/InstallmentSelector";
import {
  checkInstallment,
  numberOfInstallments,
  separateInstallmentsTransactions,
  setInstallmentId,
} from "../../services/checkInstallment";
import { toast, ToastContainer } from "react-toastify";

const AddTransaction = ({ transactions, setTransactions }) => {
  const valueInput = useRef("");
  const nameInput = useRef("");

  const dayInputRef = useRef();
  const monthInputRef = useRef();
  const yearInputRef = useRef();

  const [dayInput, setDayInput] = useState();
  const [monthInput, setMonthInput] = useState();
  const [yearInput, setYearInput] = useState();
  const [mainDisplay, setMainDisplay] = useState("");
  const [type, setType] = useState(null);
  const [valueText, setValueText] = useState();

  const [categoryDisplay, setCategoryDisplay] = useState("hidden");
  const [categoryInput, setCategoryInput] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState();

  const [installmentDisplay, setInstallmentDisplay] = useState("hidden");
  const [installmentInput, setInstallmentInput] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState();

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

  useEffect(() => {
    if (installmentInput == true) {
      setInstallmentDisplay("");
      setMainDisplay("hidden");
    } else if (installmentInput == false) {
      setInstallmentDisplay("hidden");
      setMainDisplay("");
    }
  }, [installmentInput]);

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

    let data = {
      id: newTransaction.id,
      name: newTransaction.name,
      value: Number(valueText),
      type: newTransaction.type,
      date: newTransaction.date,
      category: newTransaction.category,
      installment: {
        isInstallment: newTransaction.installment.isInstallment,
        id: newTransaction.installment.id,
        amount: newTransaction.installment.amount,
      },
    };

    if (newTransaction.installment.isInstallment) {
      setTransactions((prev) => {
        const newList = [...prev, ...separateInstallmentsTransactions(data)];
        saveTransaction(newList);

        return newList;
      });
      navigate("/");
    } else {
      setTransactions((prev) => {
        const newList = [...prev, data];
        saveTransaction(newList);

        return newList;
      });
      navigate("/");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className={`${categoryDisplay}`}>
        <CategoryList
          setCategoryInput={setCategoryInput}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className={`${installmentDisplay}`}>
        <InstallmentSelector
          setInstallmentInput={setInstallmentInput}
          setSelectedInstallment={setSelectedInstallment}
          selectedInstallment={selectedInstallment}
          value={valueText}
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
            setInstallmentInput={setInstallmentInput}
            selectedInstallment={selectedInstallment}
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
                  installment: {
                    isInstallment: checkInstallment(selectedInstallment),
                    id: setInstallmentId(selectedInstallment),
                    amount: numberOfInstallments(selectedInstallment),
                  },
                };

                const isDataValid = validateTransaction(data);

                if (isDataValid.success) {
                  console.log(isDataValid.data);
                  sendTransaction(data);
                } else {
                  toast.error(isDataValid.error, {
                    position: "top-center",
                    autoClose: 2500,
                    draggable: true,
                    theme: "colored",
                  });
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

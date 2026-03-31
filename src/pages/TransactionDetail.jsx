import { useNavigate, useParams } from "react-router-dom";
import { loadTransaction, saveTransaction } from "../../services/storage";
import { useEffect, useRef, useState } from "react";
import { Check, Trash2, X } from "lucide-react";
import CategoryList from "./CategoryList.jsx";
import InputName from "../components/inputs/InputName.jsx";
import DateInput from "../components/inputs/DateInput.jsx";
import InputValue from "../components/inputs/InputValue.jsx";
import CategoryInput from "../components/inputs/CategoryInput.jsx";
import TypeInput from "../components/inputs/TypeInput.jsx";

const TransactionDetail = ({ onDelete, setTransactions }) => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [dayInput, setDayInput] = useState();
  const [monthInput, setMonthInput] = useState();
  const [yearInput, setYearInput] = useState();

  const [transaction, setTransaction] = useState(null);
  const [type, setType] = useState(null);
  const [valueText, setValueText] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryInput, setCategoryInput] = useState(false);
  const [categoryDisplay, setCategoryDisplay] = useState("hidden");

  const [mainDisplay, setMainDisplay] = useState("");

  const dayInputRef = useRef();
  const monthInputRef = useRef();
  const yearInputRef = useRef();

  const tName = useRef();
  const tValue = useRef();

  const incomeCheck = useRef();
  const outcomeCheck = useRef();

  const tList = loadTransaction();
  const indexToEdit = tList.findIndex((t) => t.id == transactionId);

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
    setType((prev) => (prev === value ? null : value));
  };

  const sendChanges = (name, value, date) => {
    let tType;
    let correctValue = value;

    if (name.trim() == "") {
      return alert("Nome nao pode estar vazio");
    }

    if (!value || value < 1) {
      return alert("Valor nao pode ser negativo, zero ou vazio");
    }

    if (date == "") {
      return alert("Data nao pode estar vazia", date);
    }

    if (type === "income") {
      tType = "income";
    } else if (type === "outcome") {
      tType = "outcome";
      correctValue = "-" + value;
    } else {
      return alert("Deve selecionar entrada ou saída");
    }

    const data = {
      id: Number(transactionId),
      name: name,
      value: Number(correctValue),
      type: type,
      date: date,
      category: selectedCategory,
    };

    const updatedList = [...tList];
    updatedList[indexToEdit] = data;

    setTransactions(() => {
      saveTransaction(updatedList);
      navigate("/");
      return updatedList;
    });
  };

  useEffect(() => {
    const transactionList = loadTransaction();
    const found = transactionList.find(
      (element) => element.id == transactionId,
    );

    setSelectedCategory(found.category);

    const formatted = {
      ...found,
      value:
        found.type === "outcome" ? String(found.value).slice(1) : found.value,
    };

    setTransaction(formatted);
  }, [transactionId]);

  if (!transaction) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <div className={`${categoryDisplay}`}>
        <CategoryList
          setCategoryInput={setCategoryInput}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      <section className={`h-140 ${mainDisplay}`}>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-zinc-950 w-full h-18 flex items-center justify-between pl-4 pr-4 mb-4">
            <div className="">
              <span className="text-2xl text-white">Editar transaçao</span>
            </div>
            <button
              className="rounded-xl p-1.5  bg-red-200 font-bold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
              onClick={() => {
                if (
                  window.confirm("Tem certeza que quer deletar esta transaçao?")
                ) {
                  onDelete(transaction.id);
                  navigate("/");
                }
              }}
            >
              <Trash2 color="red" />
            </button>
          </div>
          <InputName nameInput={tName} defaultValue={transaction.name} />

          <InputValue
            valueInput={tValue}
            defaultValue={transaction.value}
            setValueText={setValueText}
            valueText={valueText}
          />

          <CategoryInput
            setCategoryInput={setCategoryInput}
            selectedCategory={selectedCategory}
          />

          <TypeInput
            handleChange={handleChange}
            incomeCheck={incomeCheck}
            outcomeCheck={outcomeCheck}
            type={type}
          />

          <div className="mt-2">
            <DateInput
              defaultDate={transaction.date}
              dayInput={dayInputRef}
              monthInput={monthInputRef}
              yearInput={yearInputRef}
              setDayInput={setDayInput}
              setMonthInput={setMonthInput}
              setYearInput={setYearInput}
            />
          </div>

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
                if (
                  !dayInputRef.current.value ||
                  !monthInputRef.current.value ||
                  !yearInputRef.current.value
                ) {
                  alert("erro na data");
                }

                const value = tValue.current.value.replace(",", ".");
                sendChanges(tName.current.value, Number(value), {
                  day: dayInputRef.current.value,
                  month: monthInputRef.current.value,
                  year: yearInputRef.current.value,
                });
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

export default TransactionDetail;

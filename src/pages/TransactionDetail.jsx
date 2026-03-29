import { useNavigate, useParams } from "react-router-dom";
import { loadTransaction, saveTransaction } from "../../services/storage";
import { useEffect, useRef, useState } from "react";
import { Check, Trash2, X } from "lucide-react";
import CategoryList from "./CategoryList.jsx";
import InputName from "../components/inputs/InputName.jsx";
import DateInput from "../components/inputs/DateInput.jsx";
import InputValue from "../components/inputs/InputValue.jsx";
import CategoryInput from "../components/inputs/CategoryInput.jsx";

const TransactionDetail = ({ onDelete, setTransactions }) => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [valueText, setValueText] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryInput, setCategoryInput] = useState(false);
  const [categoryDisplay, setCategoryDisplay] = useState("hidden");

  const [mainDisplay, setMainDisplay] = useState("");

  const dayInput = useRef();
  const monthInput = useRef();
  const yearInput = useRef();

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
    setTipo((prev) => (prev === value ? null : value));
  };

  const sendChanges = (name, value, date) => {
    let type;
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

    if (tipo === "income") {
      type = "income";
    } else if (tipo === "outcome") {
      type = "outcome";
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
      <section className={`relative h-140 ${mainDisplay}`}>
        <div className="border w-[90%] flex flex-col justify-center items-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl outline-0 shadow-xl transition-shadow duration-300 border-stone-400">
          <button
            className="rounded-xl p-1.5 absolute top-2 right-2 bg-red-200 font-bold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
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
          <div className="w-82 flex justify-center mt-2 mb-6">
            <span className="text-2xl">Editar transaçao</span>
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

          <div className="bg-white p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex gap-6 items-center justify-center mt-2">
            <div className="flex justify-center items-center gap-1">
              <input
                type="checkbox"
                checked={tipo === "income"}
                onChange={() => handleChange("income")}
                ref={incomeCheck}
              />
              Entrada
            </div>

            <div className="flex justify-center items-center gap-1">
              <input
                type="checkbox"
                checked={tipo === "outcome"}
                onChange={() => handleChange("outcome")}
                ref={outcomeCheck}
              />
              Saída
            </div>
          </div>

          <div className="mt-2">
            <DateInput
              defaultDate={transaction.date}
              dayInput={dayInput}
              monthInput={monthInput}
              yearInput={yearInput}
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
                  !dayInput.current.value ||
                  !monthInput.current.value ||
                  !yearInput.current.value
                ) {
                  alert("erro na data");
                }

                const value = tValue.current.value.replace(",", ".");
                sendChanges(tName.current.value, Number(value), {
                  day: dayInput.current.value,
                  month: monthInput.current.value,
                  year: yearInput.current.value,
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

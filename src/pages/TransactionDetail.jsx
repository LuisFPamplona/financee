import { useNavigate, useParams } from "react-router-dom";
import { loadTransaction, saveTransaction } from "../../services/storage";
import { useActionState, useEffect, useRef, useState } from "react";
import BottomNav from "../components/BottomNav.jsx";
import DateInput from "../components/DateInput.jsx";
import { Check, ChevronsRight, Edit, Trash2, X } from "lucide-react";
import CategoryList from "./CategoryList.jsx";

const TransactionDetail = ({ onDelete, setTransactions }) => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [transaction, setTransaction] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [dayInput, setDayInput] = useState();
  const [monthInput, setMonthInput] = useState();
  const [yearInput, setYearInput] = useState();
  const [valueText, setValueText] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryInput, setCategoryInput] = useState(false);
  const [categoryDisplay, setCategoryDisplay] = useState("hidden");

  const [mainDisplay, setMainDisplay] = useState("");

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
      <section className={`relative h-screen ${mainDisplay}`}>
        <div className="border w-[90%] flex flex-col justify-center items-center absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl outline-0 shadow-xl transition-shadow duration-300 border-stone-400">
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
          <div className="w-82">
            <input
              type="text"
              ref={tName}
              className="bg-white p-3 w-full rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 mt-2"
              placeholder="Nome"
              defaultValue={transaction.name}
            />
          </div>

          <div className="flex items-baseline gap-1  mt-2 bg-white p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 ">
            <p className="bg-white">R$</p>

            <input
              type="text"
              ref={tValue}
              defaultValue={transaction.value}
              value={valueText}
              placeholder="0,00"
              className="outline-0 text-xl"
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
                if (!dayInput || !monthInput || !yearInput) {
                  alert("erro");
                }

                const value = tValue.current.value.replace(",", ".");
                sendChanges(
                  tName.current.value,
                  Number(value),
                  dayInput + "/" + monthInput + "/" + yearInput,
                );
              }}
            >
              <Check color="white" width={48} height={48} />
            </button>
          </div>
        </div>
      </section>
      <BottomNav />
    </>
  );
};

export default TransactionDetail;

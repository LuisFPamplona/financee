import { useNavigate, useParams } from "react-router-dom";
import { loadTransaction, saveTransaction } from "../../services/storage";
import { useEffect, useRef, useState } from "react";
import { Check, List, Trash2, X } from "lucide-react";
import CategoryList from "./CategoryList.jsx";
import InputName from "../components/inputs/InputName.jsx";
import DateInput from "../components/inputs/DateInput.jsx";
import InputValue from "../components/inputs/InputValue.jsx";
import CategoryInput from "../components/inputs/CategoryInput.jsx";
import TypeInput from "../components/inputs/TypeInput.jsx";
import { searchTransaction } from "../../services/searchTransaction.js";
import {
  checkInstallment,
  numberOfInstallments,
  separateInstallmentsTransactions,
  setInstallmentId,
} from "../../services/checkInstallment.js";
import { validateTransaction } from "../../services/validateTransaction.js";
import InstallmentSelector from "../components/features/InstallmentSelector.jsx";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const TransactionDetail = ({ onDelete, setTransactions }) => {
  const { transactionId } = useParams();
  const navigate = useNavigate();

  const [transactionList, setTransactionList] = useState(() => {
    return loadTransaction();
  });

  const [transaction, setTransaction] = useState();
  const [type, setType] = useState(null);
  const [valueText, setValueText] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [categoryInput, setCategoryInput] = useState(false);
  const [categoryDisplay, setCategoryDisplay] = useState("hidden");
  const [dayInput, setDayInput] = useState();
  const [monthInput, setMonthInput] = useState();
  const [yearInput, setYearInput] = useState();

  const [installmentDisplay, setInstallmentDisplay] = useState("hidden");
  const [installmentInput, setInstallmentInput] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState();

  const [mainDisplay, setMainDisplay] = useState("");

  const dayInputRef = useRef();
  const monthInputRef = useRef();
  const yearInputRef = useRef();

  const tName = useRef();
  const tValue = useRef();

  const incomeCheck = useRef();
  const outcomeCheck = useRef();

  useEffect(() => {
    if (transactionList) {
      setTransaction(() => {
        const found = searchTransaction(transactionList, transactionId);
        setSelectedCategory(() => found.category);
        setType(() => {
          handleChange(type);
          return found.type;
        });

        return found;
      });
    }
  }, [transactionList]);

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

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Tem certeza?",
      text: "Essa transação será excluída permanentemente.",
      icon: "warning",
      background: "#18181b",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sim, excluir",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      onDelete(id);
      navigate("/");
    }
  };

  const handleChange = (value) => {
    setType((prev) => (prev === value ? null : value));
  };

  const sendChanges = (data, list) => {
    if (!list) {
      console.log("List Not Found");
    }

    const newList = [...list];

    const indexToChange = list.findIndex((i) => i.id == data.id);

    if (data.installment.isInstallment) {
      const updatedList = newList.filter(
        (item, index) => index !== indexToChange,
      );

      setTransactions(() => [
        ...updatedList,
        ...separateInstallmentsTransactions(data),
      ]);
      saveTransaction(newList);
    } else {
      newList[indexToChange] = data;
      setTransactions(newList);
      saveTransaction(newList);
    }
    navigate("/");
  };

  if (!transaction) {
    return (
      <>
        <div>Carregando transactions...</div>
      </>
    );
  }

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
      <section className={`h-140 ${mainDisplay}`}>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-zinc-950 w-full h-18 flex items-center justify-between pl-4 pr-4 mb-4">
            <div className="">
              <span className="text-2xl text-white">Editar transaçao</span>
            </div>
            <button
              className="rounded-xl p-1.5  bg-red-200 font-bold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
              onClick={() => {
                handleDelete(transaction.id);
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
            setInstallmentInput={setInstallmentInput}
            selectedInstallment={selectedInstallment}
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
                const data = {
                  id: transaction.id,
                  name: tName.current.value,
                  value: Number(tValue.current.value),
                  type: type,
                  date: {
                    day: dayInputRef.current.value,
                    month: monthInputRef.current.value,
                    year: yearInputRef.current.value,
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
                  sendChanges(data, transactionList);
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

export default TransactionDetail;

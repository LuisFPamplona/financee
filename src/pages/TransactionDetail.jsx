import { useNavigate, useParams } from "react-router-dom";
import { loadTransaction, saveTransaction } from "../../services/storage";
import { useEffect, useRef, useState } from "react";

const TransactionDetail = ({ onDelete, setTransactions }) => {
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [tipo, setTipo] = useState(null);

  const tName = useRef();
  const tValue = useRef();
  const tDate = useRef();
  const incomeCheck = useRef();
  const outcomeCheck = useRef();

  const tList = loadTransaction();
  const indexToEdit = tList.findIndex((t) => t.id == transactionId);

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

    if (incomeCheck.current.checked == true) {
      type = "income";
    } else if (outcomeCheck.current.checked == true) {
      type = "outcome";
      correctValue = "-" + value;
    } else if (
      incomeCheck.current.checked == false &&
      outcomeCheck.current.checked == false
    ) {
      return alert("Deve selecionar entrada ou saida");
    }

    const data = {
      id: transactionId,
      name: name,
      value: Number(correctValue),
      type: type,
      date: date,
    };

    tList[indexToEdit] = data;

    setTransactions(() => {
      saveTransaction(tList);
      navigate("/");
      return tList;
    });
  };

  useEffect(() => {
    const transactionList = loadTransaction();
    const found = transactionList.find(
      (element) => element.id == transactionId,
    );

    if (found.type == "outcome") {
      found.value = String(found.value).slice(1);
    }
    setTransaction(found);
  }, [transactionId]);

  if (!transaction) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <button
        className="border rounded-xl p-1.5 font-bold bg-black text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        onClick={() => navigate("/")}
      >
        Voltar
      </button>
      <div className="flex gap-1 p-1 flex-col border justify-center items-center mt-4 mr-4 ml-4">
        <input
          type="text"
          className="border"
          ref={tName}
          defaultValue={transaction.name}
        ></input>
        <input
          type="text"
          className="border"
          ref={tValue}
          defaultValue={transaction.value}
        ></input>
        <input
          type="date"
          className="border"
          ref={tDate}
          defaultValue={transaction.date}
        ></input>
        <div>
          <label>
            <input
              type="checkbox"
              ref={incomeCheck}
              checked={tipo === "income"}
              onChange={() => handleChange("income")}
            />
            Entrada
          </label>

          <label style={{ marginLeft: "10px" }}>
            <input
              type="checkbox"
              ref={outcomeCheck}
              defaultChecked="true"
              checked={tipo === "outcome"}
              onChange={() => handleChange("outcome")}
            />
            Saída
          </label>
        </div>
        <button
          className="border rounded-xl p-1.5 font-bold bg-orange-400 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
          onClick={() => {
            sendChanges(
              tName.current.value,
              tValue.current.value,
              tDate.current.value,
            );
          }}
        >
          Confirmar
        </button>
      </div>
      <button
        className="border rounded-xl p-1.5 font-bold bg-red-400 text-white hover:scale-105 active:scale-95 transition-all cursor-pointer"
        onClick={() => {
          if (window.confirm("Tem certeza que quer deletar esta transaçao?")) {
            onDelete(transaction.id);
            navigate("/");
          }
        }}
      >
        Deletar
      </button>
    </>
  );
};

export default TransactionDetail;

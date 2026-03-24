import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import AddTransaction from "./pages/AddTransaction";
import { useEffect, useState } from "react";
import { balanceAdjust } from "../utils/balance";
import { loadTransaction, saveTransaction } from "../services/storage";
import TransactionDetail from "./pages/TransactionDetail";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setTransactions(loadTransaction());
  }, []);

  useEffect(() => {
    setBalance(() => balanceAdjust(transactions));
  }, [transactions]);

  const deleteTransaction = (id) => {
    setTransactions((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      saveTransaction(updated);
      return updated;
    });
  };

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Dashboard
                balance={balance}
                transactions={transactions}
                deleteTransaction={deleteTransaction}
              />
            }
          />
          <Route
            path="/AddTransaction"
            element={
              <AddTransaction
                transactions={transactions}
                setTransactions={setTransactions}
                balance={balance}
                setBalance={setBalance}
              />
            }
          />
          <Route
            path="/transaction/:transactionId"
            element={<TransactionDetail onDelete={deleteTransaction} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

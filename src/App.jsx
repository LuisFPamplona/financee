import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import { useEffect, useState } from "react";
import { balanceAdjust } from "../utils/balance";
import { loadTransaction, saveTransaction } from "../services/storage";
import TransactionDetail from "./pages/TransactionDetail";
import Statistic from "./pages/Statistic";
import Header from "./components/ui/Header";
import BottomNav from "./components/ui/BottomNav";
import Calendar from "./pages/Calendar";

function App() {
  const [transactions, setTransactions] = useState(() => {
    return loadTransaction();
  });
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(() => balanceAdjust(transactions));
  }, [transactions]);

  useEffect(() => {
    saveTransaction(transactions);
  }, [transactions]);

  const deleteTransaction = (id) => {
    setTransactions((prev) => {
      const updated = prev.filter((t) => t.id !== id);
      return updated;
    });
  };

  return (
    <>
      <Router>
        <Header />
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
            element={
              <TransactionDetail
                onDelete={deleteTransaction}
                setTransactions={setTransactions}
              />
            }
          />
          <Route
            path="/statistic"
            element={<Statistic transactions={transactions} />}
          />
          <Route
            path="/calendar"
            element={<Calendar transactions={transactions} />}
          />
        </Routes>
        <BottomNav />
      </Router>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import AddTransaction from "./pages/AddTransaction";
import { useEffect, useState } from "react";
import { balanceAdjust } from "../utils/balance";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    setBalance(() => balanceAdjust(transactions));
  }, [transactions]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard balance={balance} />} />
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
        </Routes>
      </Router>
    </>
  );
}

export default App;

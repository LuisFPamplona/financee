import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/DashBoard";
import AddTransaction from "./pages/AddTransaction";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Dashboard balance={balance} setBalance={setBalance} />}
          />
          <Route
            path="/AddTransaction"
            element={
              <AddTransaction balance={balance} setBalance={setBalance} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;

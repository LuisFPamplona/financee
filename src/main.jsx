import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import BottomNav from "./components/BottomNav.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="w-screen h-screen">
      <App />
    </div>
  </StrictMode>,
);

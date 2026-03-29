import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center mt-18">
      <h1 className="text-2xl">404 - Página nao encontrada</h1>
      <p>A página que voce procurou nao existe.</p>
      <button className="border rounded p-2 mt-2 active:scale-98 cursor-pointer shadow-2xl transition-all">
        <Link to="/">Ir para início</Link>
      </button>
    </div>
  );
};

export default NotFoundPage;

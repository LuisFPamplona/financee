import { useEffect, useState } from "react";
import { loadCaterogy, saveCategory } from "../../services/storage";
import { CircleCheckBig, CornerUpLeft } from "lucide-react";

const CategoryList = ({ setCategoryInput, setSelectedCategory }) => {
  const [categoryList, setCategoryList] = useState(() => {
    return loadCaterogy();
  });

  useEffect(() => {
    saveCategory(categoryList);
  }, [categoryList]);

  const COLORS = [
    "#22c55e",
    "#ef4444",
    "#3b82f6",
    "#f59e0b",
    "#a855f7",
    "#14b8a6",
  ];

  const renderList = categoryList.map((item, index) => {
    return (
      <div
        className="flex border justify-between items-center gap-4 border-gray-400 mt-2 p-3 w-82 rounded-xl outline-0 cursor-pointer bg-zinc-900 active:scale-98 hover:scale-105 transition-all"
        key={index}
        onClick={() => {
          setSelectedCategory(item);
          setCategoryInput(false);
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-4 h-4 rounded-sm"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          />
          <p className="text-white font-bold text-sm">{item}</p>
        </div>
        <CircleCheckBig color="white" />
      </div>
    );
  });

  return (
    <>
      <section className="h-140">
        <div className="w-full h-18 bg-zinc-950 flex justify-between items-center mb-4 pl-4 pr-4">
          <span className="text-2xl mb-4 text-white">Lista de categorias</span>
          <span
            className="cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 active:scale-95"
            onClick={() => setCategoryInput(false)}
          >
            <CornerUpLeft color="black" />
          </span>
        </div>
        <div className="w-full h-92 flex justify-center items-center">
          <div>{renderList}</div>
        </div>
      </section>
    </>
  );
};

export default CategoryList;

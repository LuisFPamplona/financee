import { useEffect, useState } from "react";
import { loadCaterogy, saveCategory } from "../../services/storage";

import { CircleCheckBig, CornerUpLeft, SquarePen, X } from "lucide-react";

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
        className="flex border justify-between items-center gap-4 border-gray-400 mt-2 bg-white p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-100 active:scale-98 "
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
          {item}
        </div>
        <CircleCheckBig color="gray" />
      </div>
    );
  });

  return (
    <>
      <section className="relative h-140">
        <div className="border w-90 h-115 flex flex-col justify-center items-center absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl outline-0 shadow-xl transition-shadow duration-300 border-stone-400">
          <div className="w-82 flex justify-center items-center mt-2 mb-2">
            <span
              className="absolute right-3.5 top-7 cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 active:scale-95"
              onClick={() => setCategoryInput(false)}
            >
              <CornerUpLeft color="black" />
            </span>
            <span className="text-2xl mb-4">Lista de categorias</span>
          </div>
          <div>{renderList}</div>
        </div>
      </section>
    </>
  );
};

export default CategoryList;

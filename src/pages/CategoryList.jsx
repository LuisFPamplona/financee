import { useEffect, useState } from "react";
import { loadCaterogy, saveCategory } from "../../services/storage";
import BottomNav from "../components/BottomNav";
import { CircleCheckBig, CornerUpLeft, SquarePen, X } from "lucide-react";

const CategoryList = ({ setCategoryInput, setSelectedCategory }) => {
  const [categoryList, setCategoryList] = useState(() => {
    return loadCaterogy();
  });

  useEffect(() => {
    saveCategory(categoryList);
  }, [categoryList]);

  const renderList = categoryList.map((item, index) => {
    return (
      <div
        className="w-82 flex justify-between mt-2 mb-2 bg-white p-3 rounded-xl outline-0 shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        key={index}
        onClick={() => {
          setSelectedCategory(item);
          setCategoryInput(false);
        }}
      >
        {item}
        <CircleCheckBig color="gray" />
      </div>
    );
  });

  return (
    <>
      <section className="relative h-screen">
        <div className="border w-90 flex flex-col justify-center items-center absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 rounded-xl outline-0 shadow-xl transition-shadow duration-300 border-stone-400">
          <div className="w-82 flex justify-center items-center mt-2 mb-2">
            <span
              className="absolute left-3.5 top-2 cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 active:scale-95"
              onClick={() => alert("Funçao em desenvolvimento")}
            >
              <SquarePen color="black" />
            </span>
            <span
              className="absolute right-3.5 top-2 cursor-pointer bg-gray-100 p-2 rounded-full hover:scale-105 active:scale-95"
              onClick={() => setCategoryInput(false)}
            >
              <CornerUpLeft color="black" />
            </span>
            <span className="text-2xl mb-4">Lista de categorias</span>
          </div>
          <div>{renderList}</div>
        </div>
      </section>
      <BottomNav />
    </>
  );
};

export default CategoryList;

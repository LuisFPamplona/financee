import { ChevronsRight, Edit } from "lucide-react";

const CategoryInput = ({ setCategoryInput, selectedCategory }) => {
  return (
    <>
      <div
        className="bg-zinc-900 border border-gray-400 p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex gap-6 items-center justify-center mt-2 cursor-pointer"
        onClick={() => {
          setCategoryInput(true);
        }}
      >
        <div className="flex w-full justify-between">
          {!selectedCategory && (
            <p className="text-white font-bold">Categorias</p>
          )}
          {!selectedCategory && <ChevronsRight color="white" />}
          {selectedCategory && (
            <div className="flex justify-between w-full relative text-white font-bold">
              {selectedCategory} <Edit color="white" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryInput;

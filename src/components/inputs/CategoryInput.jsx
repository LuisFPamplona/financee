import { ChevronsRight, Edit } from "lucide-react";

const CategoryInput = ({ setCategoryInput, selectedCategory }) => {
  return (
    <>
      <div
        className="bg-white p-3 w-82 rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex gap-6 items-center justify-center mt-2 cursor-pointer"
        onClick={() => {
          setCategoryInput(true);
        }}
      >
        <div className="flex w-full justify-between">
          {!selectedCategory && <p>Categorias</p>}
          {!selectedCategory && <ChevronsRight />}
          {selectedCategory && (
            <div className="flex justify-between w-full relative">
              {selectedCategory} <Edit />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryInput;

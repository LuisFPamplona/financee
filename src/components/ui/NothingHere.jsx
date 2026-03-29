import { BrushCleaning, Wind } from "lucide-react";

const NothingHere = () => {
  return (
    <>
      <div className="flex flex-col gap-70 mt-12">
        <div className="flex flex-col items-center text-2xl">
          <p>Nenhuma transação</p>
          <p className="flex">
            <BrushCleaning />
            <Wind />
          </p>
        </div>
      </div>
    </>
  );
};

export default NothingHere;

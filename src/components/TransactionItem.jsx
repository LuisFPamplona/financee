const TransactionItem = ({ value, date, name, type, category }) => {
  const typeColor = type === "income" ? "text-green-400" : "text-red-400";

  const balanceText = String(value).replace(".", ",");
  let editedValue;

  if (balanceText.includes(",")) {
    const centsStart = balanceText.indexOf(",");
    const cents = balanceText.slice(centsStart);

    if (cents.length < 3) {
      editedValue = balanceText + "0";
    } else {
      editedValue = balanceText;
    }
  } else {
    editedValue = balanceText + ",00";
  }

  return (
    <>
      <div
        className={`border flex items-center justify-between gap-4 max-h-20 w-80 mt-1`}
      >
        <div className="flex flex-col justify-center items-center w-full ">
          <p className="border-b w-full bg-white border-t text-center h-6">
            {name}
          </p>
          <div
            className={`flex border-b items-center bg-gray-800 justify-center relative  h-14 w-full`}
          >
            <p className="absolute right-1 bottom-1 text-white text-sm">
              {date}
            </p>
            <p className="absolute right-1 top-1 text-white text-sm">
              {category}
            </p>
            <div className="flex text-white items-baseline gap-1">
              <p>R$</p>
              <p className={`text-2xl ${typeColor} tracking-wide`}>
                {editedValue}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionItem;

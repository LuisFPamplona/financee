const InputName = ({ nameInput, defaultValue }) => {
  return (
    <>
      <div className="w-82">
        <input
          type="text"
          className="bg-white p-3 w-full rounded-xl outline-0 shadow-xl hover:shadow-2xl transition-shadow duration-300 mt-2"
          placeholder="Nome"
          ref={nameInput}
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

export default InputName;

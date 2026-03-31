const InputName = ({ nameInput, defaultValue }) => {
  return (
    <>
      <div className="w-82 h-12 border border-gray-400 bg-zinc-900 rounded-xl flex pl-3">
        <input
          type="text"
          className="text-white font-bold outline-0"
          placeholder="Nome"
          ref={nameInput}
          defaultValue={defaultValue}
        />
      </div>
    </>
  );
};

export default InputName;

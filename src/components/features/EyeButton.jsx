import { Eye, EyeClosed } from "lucide-react";

const EyeButton = ({ visible, setVisible }) => {
  return (
    <>
      <button
        className="p-1 cursor-pointer"
        onClick={() => {
          if (visible) setVisible(false);
          if (!visible) setVisible(true);
        }}
      >
        {visible && <Eye size={30} color="white" />}
        {!visible && <EyeClosed size={35} color="white" />}
      </button>
    </>
  );
};

export default EyeButton;

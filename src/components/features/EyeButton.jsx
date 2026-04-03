import { Eye, EyeClosed } from "lucide-react";

const EyeButton = ({ visible, setVisible, color }) => {
  return (
    <>
      <button
        className="p-1 cursor-pointer"
        onClick={() => {
          if (visible) setVisible(false);
          if (!visible) setVisible(true);
        }}
      >
        {visible && <Eye size={30} color={color} />}
        {!visible && <EyeClosed size={35} color={color} />}
      </button>
    </>
  );
};

export default EyeButton;

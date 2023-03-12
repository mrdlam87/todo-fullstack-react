import "./check-input.style.scss";
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";

const CheckInput = ({ label, checked, onClick }) => {
  return (
    <div className="check-input" onClick={onClick}>
      {checked ? (
        <IoCheckbox className="check-icon" />
      ) : (
        <IoSquareOutline className="check-icon" />
      )}
      {label && <label>{label}</label>}
    </div>
  );
};

export default CheckInput;

import "./form.style.scss";
import { IoCloseCircle } from "react-icons/io5";

const Form = ({
  title,
  children,
  onCancelClick,
  onAddClick,
  onCloseClick,
  edit,
}) => {
  return (
    <div className="form">
      <div className="form-title">
        <h2>{title}</h2>
        <IoCloseCircle className="title-icon" onClick={onCloseClick} />
      </div>
      <div className="form-body">{children}</div>
      <div className="form-footer">
        <button className="clear-btn" onClick={onCancelClick}>
          {edit ? "DELETE" : "CANCEL"}
        </button>
        <button className="submit-btn" onClick={onAddClick}>
          {edit ? "UPDATE" : "ADD"}
        </button>
      </div>
    </div>
  );
};

export default Form;

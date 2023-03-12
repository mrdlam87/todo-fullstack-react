import "./list-card.style.scss";
import { IoAddCircle } from "react-icons/io5";

const ListCard = ({ children, title, onAddClick }) => {
  return (
    <div className="list-card">
      <div className="title-bar">
        <h2>{title}</h2>
        <IoAddCircle className="title-icon" onClick={onAddClick} />
      </div>
      <div className="list-body">{children}</div>
    </div>
  );
};

export default ListCard;

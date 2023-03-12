import { useContext } from "react";
import { UIContext } from "../../contexts/ui.context";
import { UserContext } from "../../contexts/user.context";
import { getFormattedDate } from "../../util/date";
import CheckInput from "../check-input/check-input.component";
import TodoForm from "../todo-form/todo-form.component";
import "./todo-item.style.scss";

const TodoItem = ({ todo }) => {
  const { description, complete } = todo;
  const { currentUser, updateUserTodo } = useContext(UserContext);
  const { setModal, setFormType } = useContext(UIContext);

  const onEditClick = () => {
    setFormType(<TodoForm user={currentUser} todo={todo} edit />);
    setModal(true);
  };

  const onCheckClick = async () => {
    // PUT
    todo.complete = !todo.complete;
    todo.dateCompleted = complete ? "" : getFormattedDate(new Date());
    await updateUserTodo(todo);
  };

  let completedClassName = complete ? "completed" : "";

  return (
    <div className="item-container">
      <div className="list-label-container">
        <CheckInput checked={complete} onClick={onCheckClick} />
        <h3 className={`list-label ${completedClassName}`}>{description}</h3>
      </div>
      <p onClick={onEditClick}>EDIT</p>
    </div>
  );
};

export default TodoItem;

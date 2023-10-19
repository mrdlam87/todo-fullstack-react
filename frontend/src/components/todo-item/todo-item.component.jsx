import { useContext } from "react";
import { UIContext } from "../../contexts/ui.context";
import { UserContext } from "../../contexts/user.context";
import { getFormattedDate } from "../../util/date";
import CheckInput from "../check-input/check-input.component";
import TodoForm from "../todo-form/todo-form.component";
import "./todo-item.style.scss";
import { TodoContext } from "../../contexts/todo.context";

const TodoItem = ({ todo }) => {
  const { name, complete } = todo;
  const { currentUser } = useContext(UserContext);
  const { updateTodo } = useContext(TodoContext);
  const { setModal, setFormType } = useContext(UIContext);

  const onEditClick = () => {
    setFormType(<TodoForm user={currentUser} todo={todo} edit />);
    setModal(true);
  };

  const onCheckClick = async () => {
    // PUT
    todo.complete = !todo.complete;
    todo.dateCompleted = complete ? "" : getFormattedDate(new Date());
    await updateTodo(currentUser.id, todo);
  };

  let completedClassName = complete ? "completed" : "";

  return (
    <div className="item-container">
      <div className="list-label-container">
        <CheckInput checked={complete} onClick={onCheckClick} />
        <h3 className={`list-label ${completedClassName}`}>{name}</h3>
      </div>
      <p onClick={onEditClick}>EDIT</p>
    </div>
  );
};

export default TodoItem;

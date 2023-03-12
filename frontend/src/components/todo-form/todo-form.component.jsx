import { useContext, useState } from "react";
import { UIContext } from "../../contexts/ui.context";
import { UserContext } from "../../contexts/user.context";
import CheckInput from "../check-input/check-input.component";
import DatePicker from "../date-picker/date-picker.component";
import Form from "../form/form.component";
import TextInput from "../text-input/text-input.component";
import { getFormattedDate } from "../../util/date";

const TodoForm = ({ user, todo, edit }) => {
  const { setModal } = useContext(UIContext);
  const { currentUserTodos, addUserTodo, updateUserTodo, deleteUserTodo } =
    useContext(UserContext);

  const lastIndex = () => {
    const sortedTodos = [...currentUserTodos].sort((a, b) => a.id - b.id);

    return sortedTodos.length === 0
      ? 0
      : sortedTodos[sortedTodos.length - 1].id;
  };

  const [formData, setFormData] = useState({
    id: todo ? todo.id : lastIndex() + 1,
    description: todo ? todo.description : "",
    dateCreated: todo ? todo.dateCreated : getFormattedDate(new Date()),
    dateCompleted: todo ? todo.dateCompleted : "",
    complete: todo ? todo.complete : false,
    userId: user.id,
  });

  const onCancelHandler = async () => {
    // DELETE
    if (edit) {
      deleteUserTodo(todo.id);
    }

    setModal(false);
  };
  const onAddHandler = async () => {
    try {
      // POST
      if (!edit) {
        await addUserTodo(formData);
      } else {
        // PUT
        todo.description = formData.description;
        todo.dateCompleted = formData.dateCompleted;
        todo.complete = formData.complete;
        updateUserTodo(todo);
      }

      setModal(false);
    } catch (error) {
      console.log("Failed to update user");
    }
  };
  const inputChangeHandler = (identifier, event) =>
    setFormData((currentData) => {
      return {
        ...currentData,
        [identifier]: event.target.value,
      };
    });

  return (
    <Form
      title={`${edit ? "Update" : "Add"} Todo`}
      edit={edit}
      onCancelClick={onCancelHandler}
      onCloseClick={() => setModal(false)}
      onAddClick={onAddHandler}
    >
      <CheckInput
        label="Completed"
        checked={formData.complete}
        onClick={() =>
          setFormData((currentData) => {
            return { ...currentData, complete: !formData.complete };
          })
        }
      />

      <TextInput
        label="Description"
        placeholderText="Enter Todo description"
        value={formData.description}
        onChange={inputChangeHandler.bind(this, "description")}
      />
      <DatePicker
        label="Date Completed"
        value={formData.dateCompleted ?? ""}
        onChange={inputChangeHandler.bind(this, "dateCompleted")}
      />
    </Form>
  );
};

export default TodoForm;

import { useContext, useState } from "react";
import { UIContext } from "../../contexts/ui.context";
import CheckInput from "../check-input/check-input.component";
import DatePicker from "../date-picker/date-picker.component";
import Form from "../form/form.component";
import TextInput from "../text-input/text-input.component";
import { getFormattedDate } from "../../util/date";
import { TodoContext } from "../../contexts/todo.context";

const TodoForm = ({ user, todo, edit }) => {
  const { setModal } = useContext(UIContext);
  const { addTodo, updateTodo, deleteTodo } = useContext(TodoContext);

  const [formData, setFormData] = useState({
    name: todo ? todo.name : "",
    dateCreated: todo ? todo.dateCreated : getFormattedDate(new Date()),
    dateCompleted: todo ? todo.dateCompleted : "",
    complete: todo ? todo.complete : false,
  });

  const onCancelHandler = async () => {
    // DELETE
    if (edit) {
      await deleteTodo(user.id, todo);
    }

    setModal(false);
  };
  const onAddHandler = async () => {
    try {
      // POST
      if (!edit) {
        await addTodo(user.id, formData);
      } else {
        // PUT
        todo.name = formData.name;
        todo.dateCompleted = formData.dateCompleted;
        todo.complete = formData.complete;
        await updateTodo(user.id, todo);
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
        value={formData.name}
        onChange={inputChangeHandler.bind(this, "name")}
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

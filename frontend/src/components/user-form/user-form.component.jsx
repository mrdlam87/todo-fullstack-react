import { useContext, useState } from "react";
import { UIContext } from "../../contexts/ui.context";
import { UserContext } from "../../contexts/user.context";
import Form from "../form/form.component";
import TextInput from "../text-input/text-input.component";

const UserForm = ({ user, edit }) => {
  const { setModal } = useContext(UIContext);
  const { addUser, updateUser, deleteUser } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: user ? user.name : "",
    todos: user ? user.todos : [],
  });

  const onCancelHandler = async () => {
    try {
      // DELETE
      if (edit) {
        await deleteUser(user.id);
      }
      console.log("Failed to update user");
      setModal(false);
    } catch (error) {}
  };
  const onAddHandler = async () => {
    try {
      // POST
      if (!edit) {
        await addUser(formData);
      } else {
        // PUT
        user.name = formData.name;
        await updateUser(user);
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
      title={`${edit ? "Update" : "Add"} User`}
      edit={edit}
      onCancelClick={onCancelHandler}
      onCloseClick={() => setModal(false)}
      onAddClick={onAddHandler}
    >
      <TextInput
        label="Full Name"
        placeholderText="Enter full name"
        value={formData.name}
        onChange={inputChangeHandler.bind(this, "name")}
      />
    </Form>
  );
};

export default UserForm;

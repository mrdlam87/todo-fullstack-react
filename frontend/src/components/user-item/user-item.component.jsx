import { useContext } from "react";
import { UIContext } from "../../contexts/ui.context";
import { UserContext } from "../../contexts/user.context";
import UserForm from "../user-form/user-form.component";
import "./user-item.style.scss";

const UserItem = ({ user }) => {
  const { name } = user;
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const { setModal, setFormType } = useContext(UIContext);

  const onEditClick = () => {
    setFormType(<UserForm user={user} edit />);
    setCurrentUser(user);
    setModal(true);
  };

  let selectedClassName =
    currentUser && currentUser.id === user.id ? "selected" : "";

  return (
    <div className="item-container">
      <h3
        className={`user-item ${selectedClassName}`}
        onClick={() => setCurrentUser(user)}
      >
        {name}
      </h3>
      <p onClick={onEditClick}>EDIT</p>
    </div>
  );
};

export default UserItem;

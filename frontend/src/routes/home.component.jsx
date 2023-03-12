import { useContext } from "react";
import ListCard from "../components/list-card/list-card.component";
import ModalOverlay from "../components/modal-overlay/modal-overlay.component";
import Modal from "../components/modal/modal.component";
import TodoForm from "../components/todo-form/todo-form.component";
import TodoItem from "../components/todo-item/todo-item.component";
import UserForm from "../components/user-form/user-form.component";
import UserItem from "../components/user-item/user-item.component";
import { UIContext } from "../contexts/ui.context";
import { UserContext } from "../contexts/user.context";

const Home = () => {
  const { users, currentUser, currentUserTodos } = useContext(UserContext);
  const { isModalOpen, setModal, formType, setFormType } =
    useContext(UIContext);

  const todoAddClick = () => {
    setFormType(<TodoForm user={currentUser} />);
    currentUser !== null ? setModal(true) : alert("Please select a user");
  };

  const userAddClick = () => {
    setFormType(<UserForm />);
    setModal(true);
  };

  return (
    <>
      <ModalOverlay
        show={isModalOpen && formType}
        onClick={() => setModal(false)}
      />
      <Modal show={isModalOpen && formType}>{formType}</Modal>
      <div className="container padding-top-md grid grid--2-cols">
        <ListCard title="Users" onAddClick={userAddClick}>
          {users && users.map((user) => <UserItem user={user} key={user.id} />)}
        </ListCard>
        <ListCard title="Todos" onAddClick={todoAddClick}>
          {currentUserTodos &&
            currentUserTodos.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
        </ListCard>
      </div>
    </>
  );
};

export default Home;

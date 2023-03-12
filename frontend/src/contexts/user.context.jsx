import { createContext, useEffect, useReducer } from "react";
import {
  delUser,
  fetchUsers,
  fetchUserTodos,
  postUser,
  putUser,
} from "../util/http";

const INITIAL_STATE = {
  users: [],
  currentUser: null,
  currentUserTodos: [],
};

const ACTION_TYPES = {
  SET_USERS: "SET_USERS",
  ADD_USER: "ADD_USER",
  UPDATE_USER: "UPDATE_USER",
  DELETE_USER: "DELETE_USER",
  SET_CURRENT_USER: "SET_CURRENT_USER",
  SET_CURRENT_USER_TODOS: "SET_CURRENT_USER_TODOS",
};

const usersReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_USERS:
      return {
        ...state,
        users: payload,
      };
    case ACTION_TYPES.ADD_USER:
      return {
        ...state,
        users: [...state.users, payload],
      };
    case ACTION_TYPES.UPDATE_USER:
      const userIndex = state.users.findIndex((td) => td.id === payload.id);
      const updatedUser = {
        ...state.users[userIndex],
        ...payload,
      };
      const updatedUsers = [...state.users];
      updatedUsers[userIndex] = updatedUser;
      return {
        ...state,
        users: updatedUsers,
      };
    case ACTION_TYPES.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((us) => us.id !== payload),
      };

    case ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case ACTION_TYPES.SET_CURRENT_USER_TODOS:
      return {
        ...state,
        currentUserTodos: payload,
      };
    default:
      return state;
  }
};

export const UserContext = createContext({
  users: [],
  setUsers: () => {},
  addUser: () => {},
  updateUser: () => {},
  deleteUser: () => {},
  currentUser: null,
  setCurrentUser: () => {},
  currentUserTodos: [],
  setCurrentUserTodos: () => {},
  addUserTodo: () => {},
  updateUserTodo: () => {},
  deleteUserTodo: () => {},
});

export const UserProvider = ({ children }) => {
  const [{ users, currentUser, currentUserTodos }, dispatch] = useReducer(
    usersReducer,
    INITIAL_STATE
  );

  const setUsers = (users) =>
    dispatch({ type: ACTION_TYPES.SET_USERS, payload: users });

  const addUser = async (user) => {
    const id = await postUser(user);
    dispatch({ type: ACTION_TYPES.ADD_USER, payload: { id, ...user } });
  };

  const updateUser = async (user) => {
    await putUser(user.id, user);
    dispatch({ type: ACTION_TYPES.UPDATE_USER, payload: user });
  };

  const deleteUser = async (id) => {
    await delUser(id);
    setCurrentUser(null);
    setCurrentUserTodos([]);
    dispatch({ type: ACTION_TYPES.DELETE_USER, payload: id });
  };

  const setCurrentUser = (user) =>
    dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: user });

  const setCurrentUserTodos = (todos) =>
    dispatch({ type: ACTION_TYPES.SET_CURRENT_USER_TODOS, payload: todos });

  const addUserTodo = async (todo) => {
    const todos = [todo, ...currentUserTodos];
    await updateUser({
      ...currentUser,
      todos,
    });
    dispatch({ type: ACTION_TYPES.SET_CURRENT_USER_TODOS, payload: todos });
  };

  const updateUserTodo = async (todo) => {
    const todoIndex = currentUserTodos.findIndex((td) => td.id === todo.id);
    const updatedTodo = {
      ...currentUserTodos[todoIndex],
      ...todo,
    };
    const updatedUserTodos = [...currentUserTodos];
    updatedUserTodos[todoIndex] = updatedTodo;
    await updateUser({
      ...currentUser,
      todos: updatedUserTodos,
    });
    dispatch({
      type: ACTION_TYPES.SET_CURRENT_USER_TODOS,
      payload: updatedUserTodos,
    });
  };

  const deleteUserTodo = async (id) => {
    const todos = currentUserTodos.filter((td) => td.id !== id);
    await updateUser({
      ...currentUser,
      todos,
    });

    dispatch({ type: ACTION_TYPES.SET_CURRENT_USER_TODOS, payload: todos });
  };

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await fetchUsers();
        setUsers(users);
      } catch (error) {
        console.log("Failed to fetch users");
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadUserTodos = async () => {
      try {
        const data = await fetchUserTodos(currentUser.id);
        console.log(0);
        setCurrentUserTodos(data);
      } catch (error) {
        console.log("Failed to fetch todos");
      }
    };

    loadUserTodos();
  }, [currentUser]);

  const value = {
    users,
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    currentUser,
    setCurrentUser,
    currentUserTodos,
    setCurrentUserTodos,
    addUserTodo,
    updateUserTodo,
    deleteUserTodo,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

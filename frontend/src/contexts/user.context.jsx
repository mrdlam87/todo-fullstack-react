import { createContext, useEffect, useReducer } from "react";
import * as http from "../util/http";

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
      const updatedUsers = state.users.map((u) =>
        u.id === payload.id ? payload : u
      );

      return {
        ...state,
        users: updatedUsers,
      };
    case ACTION_TYPES.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((us) => us.id !== payload.id),
      };

    case ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};

export const UserContext = createContext({
  users: [],
  setUsers: (users) => {},
  addUser: (user) => {},
  updateUser: (user) => {},
  deleteUser: (user) => {},
  currentUser: null,
  setCurrentUser: (user) => {},
});

export const UserProvider = ({ children }) => {
  const [{ users, currentUser, currentUserTodos }, dispatch] = useReducer(
    usersReducer,
    INITIAL_STATE
  );

  const setUsers = (users) =>
    dispatch({ type: ACTION_TYPES.SET_USERS, payload: users });

  const addUser = async (user) => {
    const { id } = await http.postUser(user);
    dispatch({ type: ACTION_TYPES.ADD_USER, payload: { id, ...user } });
  };

  const updateUser = async (user) => {
    await http.putUser(user.id, user);
    dispatch({ type: ACTION_TYPES.UPDATE_USER, payload: user });
  };

  const deleteUser = async (user) => {
    await http.delUser(user.id);
    setCurrentUser(null);
    dispatch({ type: ACTION_TYPES.DELETE_USER, payload: user });
  };

  const setCurrentUser = (user) =>
    dispatch({ type: ACTION_TYPES.SET_CURRENT_USER, payload: user });

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const users = await http.fetchUsers();
        setUsers(users);
      } catch (error) {
        console.log("Failed to fetch users");
      }
    };

    loadUsers();
  }, []);

  const value = {
    users,
    setUsers,
    addUser,
    updateUser,
    deleteUser,
    currentUser,
    setCurrentUser,
    currentUserTodos,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

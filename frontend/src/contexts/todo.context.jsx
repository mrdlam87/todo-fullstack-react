import { createContext, useReducer } from "react";
import * as http from "../util/http";

const INITIAL_STATE = {
  todos: [],
};

const ACTION_TYPES = {
  SET_TODOS: "SET_TODOS",
  ADD_TODO: "ADD_TODO",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO",
};

const todosReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_TODOS:
      return {
        ...state,
        todos: payload,
      };
    case ACTION_TYPES.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, payload],
      };
    case ACTION_TYPES.UPDATE_TODO:
      const updatedTodos = state.todos.map((t) =>
        t.id === payload.id ? payload : t
      );

      return {
        ...state,
        todos: updatedTodos,
      };
    case ACTION_TYPES.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== payload.id),
      };
    default:
      return state;
  }
};

export const TodoContext = createContext({
  todos: [],
  setTodos: (userId) => {},
  addTodo: (userId, todo) => {},
  updateTodo: (userId, todo) => {},
  deleteTodo: (userId, todo) => {},
  clearTodos: () => {},
});

export const TodoProvider = ({ children }) => {
  const [{ todos }, dispatch] = useReducer(todosReducer, INITIAL_STATE);

  const setTodos = async (userId) => {
    const fetchedTodos = await http.fetchUserTodos(userId);

    dispatch({ type: ACTION_TYPES.SET_TODOS, payload: fetchedTodos });
  };

  const addTodo = async (userId, todo) => {
    const newTodo = await http.postUserTodo(userId, todo);

    dispatch({ type: ACTION_TYPES.ADD_TODO, payload: newTodo });
  };

  const updateTodo = async (userId, todo) => {
    const updatedTodo = await http.putUserTodo(userId, todo.id, todo);

    dispatch({ type: ACTION_TYPES.UPDATE_TODO, payload: updatedTodo });
  };

  const deleteTodo = async (userId, todo) => {
    await http.delUserTodo(userId, todo.id);

    dispatch({ type: ACTION_TYPES.DELETE_TODO, payload: todo });
  };

  const clearTodos = () => {
    dispatch({ type: ACTION_TYPES.SET_TODOS, payload: [] });
  };

  const value = {
    todos,
    setTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    clearTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

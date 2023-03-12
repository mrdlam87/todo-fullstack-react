import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const TodoContext = createContext({
  todos: [],
});

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5086/todos");
        setTodos(response.data);
      } catch (error) {
        console.log("Failed to fetch todos");
      }
    };

    fetchTodos();
  }, []);

  const value = {
    todos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

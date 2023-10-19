import smartHttp from "./smartHttp";

const BACKEND_URL = "http://127.0.0.1:3000/api";

export const fetchUsers = async () => {
  const response = await smartHttp.get(BACKEND_URL + "/users");

  return response.data.data;
};

export const postUser = async (userData) => {
  const response = await smartHttp.post(BACKEND_URL + "/users", userData);

  return response.data.data;
};

export const putUser = async (id, userData) => {
  const response = await smartHttp.patch(
    BACKEND_URL + `/users/${id}`,
    userData
  );

  return response.data.data;
};

export const delUser = async (id) =>
  smartHttp.del(BACKEND_URL + `/users/${id}`);

export const fetchUserTodos = async (id) => {
  const response = await smartHttp.get(BACKEND_URL + `/users/${id}/todos`);

  return response.data.data ?? [];
};

export const postUserTodo = async (id, todoData) => {
  const response = await smartHttp.post(
    BACKEND_URL + `/users/${id}/todos`,
    todoData
  );

  return response.data.data;
};

export const putUserTodo = async (id, todoId, todoData) => {
  const response = await smartHttp.patch(
    BACKEND_URL + `/users/${id}/todos/${todoId}`,
    todoData
  );

  return response.data.data;
};

export const delUserTodo = async (id, todoId) =>
  smartHttp.del(BACKEND_URL + `/users/${id}/todos/${todoId}`);

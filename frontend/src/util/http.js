import axios from "axios";

// const BACKEND_URL =
//   "https://user-todos-default-rtdb.asia-southeast1.firebasedatabase.app/";
const BACKEND_URL = "http://127.0.0.1:3000/api";

export const fetchUsers = async () => {
  const response = await axios.get(BACKEND_URL + "/users");

  return response.data.users;
};

export const postUser = async (userData) => {
  const response = await axios.post(BACKEND_URL + "/users", userData);

  // returns ID name from Fireabase
  return response.data.id;
};

export const putUser = async (id, userData) =>
  axios.put(BACKEND_URL + `/users/${id}`, userData);

export const delUser = async (id) => axios.delete(BACKEND_URL + `/users/${id}`);

export const fetchUserTodos = async (id) => {
  const response = await axios.get(BACKEND_URL + `/users/${id}`);

  return response.data.todos ?? [];
};

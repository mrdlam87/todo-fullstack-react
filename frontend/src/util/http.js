import axios from "axios";

const BACKEND_URL =
  "https://user-todos-default-rtdb.asia-southeast1.firebasedatabase.app/";

// const BACKEND_API_URL = "http://127.0.0.1:5086";

export const fetchUsers = async () => {
  // const response = await axios.get(BACKEND_API_URL + "/users");

  // return response.data;

  const response = await axios.get(BACKEND_URL + "/users.json");

  const users = [];

  for (const key in response.data) {
    const user = {
      id: key,
      fullName: response.data[key].fullName,
      todos: response.data[key].todos ?? [],
    };

    users.push(user);
  }

  return users;
};

export const postUser = async (userData) => {
  const response = await axios.post(BACKEND_URL + "/users.json", userData);

  // returns ID name from Fireabase
  return response.data.name;
};

export const putUser = async (id, userData) =>
  axios.put(BACKEND_URL + `/users/${id}.json`, userData);

export const delUser = async (id) =>
  axios.delete(BACKEND_URL + `/users/${id}.json`);

export const fetchUserTodos = async (id) => {
  // const response = await axios.get(BACKEND_API_URL + `/users/${userId}/todos`);

  // return response.data;
  const response = await axios.get(BACKEND_URL + `/users/${id}.json`);

  return response.data.todos ?? [];
};

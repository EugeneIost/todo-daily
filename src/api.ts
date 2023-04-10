import axios from "axios";

const api = axios.create({
  baseURL: "https://daily-todo-app-982c6-default-rtdb.firebaseio.com/",
});

export default api;

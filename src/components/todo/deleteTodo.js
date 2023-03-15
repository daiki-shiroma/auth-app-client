import axios from "axios";

export default async function deleteTodo(todoId) {
  axios.delete(`${process.env.REACT_APP_HOST}/todos/${todoId}`);
}

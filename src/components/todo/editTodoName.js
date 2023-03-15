import axios from "axios";

export default async function editTodoName(id, todoName) {
  await axios.put(`${process.env.REACT_APP_HOST}/todos/${id}`, {
    name: todoName,
  });
}

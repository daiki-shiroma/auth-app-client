import axios from "axios";

export default async function toggleComplete(id, index, todos) {
  const complete = todos[index].complete;
  await axios.put(`${process.env.REACT_APP_HOST}/todos/${id}`, {
    complete: !complete,
  });
}

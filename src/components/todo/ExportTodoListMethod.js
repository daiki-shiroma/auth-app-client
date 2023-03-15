import axios from "axios";

export default function ExportTodoListMethod() {
  const toggleComplete = async (id, index, todos) => {
    const complete = todos[index].complete;
    await axios.put(`${process.env.REACT_APP_HOST}/todos/${id}`, {
      complete: !complete,
    });
  };

  const editTaskName = async (id, todoName) => {
    await axios.put(`${process.env.REACT_APP_HOST}/todos/${id}`, {
      name: todoName,
    });
  };
}

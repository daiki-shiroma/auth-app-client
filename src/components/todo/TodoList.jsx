import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { List } from "@mantine/core";
import EditTodoNameButton from "./button/EditTodoNameButton";
import CheckTodoButton from "./button/CheckTodoButton";
import DeleteTodoButton from "./button/DeleteTodoButton";

const TodoFlexList = styled.li` // TodoListはファイル名と被る
  list-style: none;
  font-size: 25px;
  display: flex;
`;

const TodoNameDiv = styled.div`
  width: 350px;
`;

const TodoName = styled.p`
  width: 100%;
  word-wrap: break-word;
`;

function TodoList(props) {
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/todos`)
      .then((res) => setTodos(res.data));
  };

  useEffect(() => {
    getTodos();
  }, [todos]);

  return (
    <>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <List size="xl">
            <List.Item>
              <TodoFlexList index={index}>
                <TodoNameDiv>
                  <TodoName>
                    {todo.complete ? <s>{todo.name}</s> : todo.name}
                  </TodoName>
                  <p>userId: {props.user.id}</p>
                </TodoNameDiv>

                <EditTodoNameButton todo={todo} getTodos={getTodos} />

                <CheckTodoButton todos={todos} todo={todo} index={index} getTodos={getTodos} />

                <DeleteTodoButton todo={todo} getTodos={getTodos} />

              </TodoFlexList>
            </List.Item>
          </List>
        ))}
      </ul>
    </>
  );
}

export default TodoList;

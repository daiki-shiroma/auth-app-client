import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import HelloUser from "../../organisms/HelloUser";
import { Link } from "react-router-dom";
import { List } from "@mantine/core";
import { Flex } from "@mantine/core";
import EditTodoNameButton from "../../atoms/button/EditTodoNameButton";
import CheckTodoButton from "../../atoms/button/CheckTodoButton";
import DeleteTodoButton from "../../atoms/button/DeleteTodoButton";

const TodoFlexList = styled.li`
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

export default function Dashboard(props) {
  const [todos, setTodos] = useState([]);

  const getUserTodos = () => {
    const userId = props.user.id;
    axios
      .get(`${process.env.REACT_APP_HOST}/todos/${userId}`)
      .then((res) => {
        if (res !== "") {
          setTodos(res.data);
        }
      })
  };

  useEffect(() => {
    props.checkLoginStatus();
    getUserTodos();
  }, [todos]);

  return (
    <>
      <h1>Dashboard</h1>
      <HelloUser isLoggedIn={props.isLoggedIn} user={props.user} />

      <h1>Your Todo List</h1>
      <ul>
        {todos.map((todo, index) => (
          <List size="xl">
            <List.Item>
              <TodoFlexList index={index}>
                <TodoNameDiv>
                  <TodoName>
                    {todo.complete ? <s>{todo.name}</s> : todo.name}
                  </TodoName>
                </TodoNameDiv>

                <EditTodoNameButton todo={todo} getUserTodos={getUserTodos} />

                <CheckTodoButton todos={todos} todo={todo} index={index} getUserTodos={getUserTodos} />

                <DeleteTodoButton todo={todo} getUserTodos={getUserTodos} />

              </TodoFlexList>
            </List.Item>
          </List>
        ))}
      </ul>

      <Flex direction="column">
        <Link to="/edituser">ユーザー情報の編集</Link>
        <Link to="/deleteuser">ユーザーの削除</Link>
        <Link to="/">ホームに戻る</Link>
      </Flex>
    </>
  );
}

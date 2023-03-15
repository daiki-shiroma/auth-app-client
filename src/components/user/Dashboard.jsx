import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import HelloUser from "./HelloUser";
import { Link } from "react-router-dom";
import { Checkbox } from "@mantine/core";
import { CloseButton } from "@mantine/core";
import { List } from "@mantine/core";
import { Popover, Button, TextInput } from "@mantine/core";
import { Flex } from "@mantine/core";
import TodoList from "../todo/TodoList";
import toggleComplete from "../todo/toggleComplete";
import editTodoName from "../todo/editTodoName";
import deleteTodo from "../todo/deleteTodo";

const TaskList = styled.li`
  list-style: none;
  font-size: 25px;
  display: flex;
`;

const TaskNameDiv = styled.div`
  width: 350px;
`;

const TaskName = styled.p`
  width: 100%;
  word-wrap: break-word;
`;

const ButtonList = styled.li`
  list-style: none;
  padding-top: 20px;
`;

const CheckboxDiv = styled.div`
  padding-left: 30px;
  padding-top: 13px;
`;

export default function Dashboard(props) {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

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
              <TaskList index={index}>
                <TaskNameDiv>
                  <TaskName>
                    {todo.complete ? <s>{todo.name}</s> : todo.name}
                  </TaskName>
                </TaskNameDiv>

                <ButtonList>
                  <div
                    style={{ display: todo.complete ? "none" : "block" }}
                  >
                    <Popover
                      width={300}
                      trapFocus
                      position="bottom"
                      withArrow
                      shadow="md"
                    >
                      <Popover.Target>
                        <Button size="xs" color="dark">
                          Edit
                        </Button>
                      </Popover.Target>
                      <Popover.Dropdown>
                        <TextInput
                          label="New task name"
                          placeholder=""
                          size="xs"
                          type="text"
                          value={todoName}
                          onChange={(e) => setTodoName(e.target.value)}
                        />
                        <Button
                          size="xs"
                          color="dark"
                          type="submit"
                          onClick={() => {
                            editTodoName(todo.id, todoName);
                            getUserTodos();
                          }
                          }
                        >
                          Change
                        </Button>
                      </Popover.Dropdown>
                    </Popover>
                  </div>
                </ButtonList>

                <ButtonList>
                  <CheckboxDiv>
                    <Checkbox
                      checked={todo.complete}
                      onClick={() => {
                        toggleComplete(todo.id, index, todos);
                        getUserTodos();
                      }}
                    />
                  </CheckboxDiv>
                </ButtonList>

                <ButtonList>
                  <div
                    style={{ display: todo.complete ? "none" : "block" }}
                  >
                    <CloseButton
                      onClick={() => {
                        deleteTodo(todo.id);
                        getUserTodos();
                      }}
                      title="Close popover"
                      size="xl"
                      iconSize={15}
                      color="red"
                    />
                  </div>
                </ButtonList>
              </TaskList>
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

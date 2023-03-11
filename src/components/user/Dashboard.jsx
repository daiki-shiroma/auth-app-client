import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import { Checkbox } from "@mantine/core";
import { CloseButton } from "@mantine/core";
import { List } from "@mantine/core";
import { Popover, Button, TextInput } from "@mantine/core";

import HelloUser from "./HelloUser";

const TaskUl = styled.ul``;

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

const EditDiv = styled.div``;

const CloseButtonDiv = styled.div``;

export default function Dashboard(props) {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

  const getUserTodos = () => {
    const userId = props.user.id;
    axios
      .get(process.env.REACT_APP_HOST + "/todos/show/" + userId)
      .then((res) => {
        if (res !== "") {
          setTodos(res.data);
        }
      })
      .catch();
  };

  const toggleComplete = async (id, index) => {
    const complete = todos[index].complete;
    await axios.put(process.env.REACT_APP_HOST + "/todos/" + id, {
      complete: !complete,
    });
    getUserTodos();
  };

  const editTaskName = async (e, id) => {
    await axios.put(process.env.REACT_APP_HOST + "/todos/" + id, {
      name: todoName,
    });
    getUserTodos();
  };

  const deleteTodo = async (todoId, index) => {
    const complete = todos[index].complete;
    await axios.put(process.env.REACT_APP_HOST + "/todos/" + todoId, {
      complete: !complete,
    });

    axios
      .delete(process.env.REACT_APP_HOST + "/todos/" + todoId)
      .then(() => getUserTodos())
      .catch();
  };

  useEffect(() => {
    props.checkLoginStatus();
    getUserTodos();
  }, [todos]);

  return (
    <div>
      <h1>Dashboard</h1>
      <HelloUser loggedInStatus={props.loggedInStatus} user={props.user} />

      <h1>Your Todo List</h1>
      <TaskUl>
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
                  <EditDiv
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
                          onClick={(e) => editTaskName(e, todo.id)}
                        >
                          Change
                        </Button>
                      </Popover.Dropdown>
                    </Popover>
                  </EditDiv>
                </ButtonList>

                <ButtonList>
                  <CheckboxDiv>
                    <Checkbox
                      checked={todo.complete ? true : false}
                      onClick={() => toggleComplete(todo.id, index)}
                    />
                  </CheckboxDiv>
                </ButtonList>

                <ButtonList>
                  <CloseButtonDiv
                    style={{ display: todo.complete ? "none" : "block" }}
                  >
                    <CloseButton
                      onClick={() => deleteTodo(todo.id, index)}
                      title="Close popover"
                      size="xl"
                      iconSize={15}
                      color="red"
                    />
                  </CloseButtonDiv>
                </ButtonList>
              </TaskList>
            </List.Item>
          </List>
        ))}
      </TaskUl>
      <Link to={`/edituser`}>ユーザー情報の編集</Link>
      <br />
      <Link to={`/deleteuser`}>ユーザーの削除</Link>
      <br />
      <Link to={`/`}>ホームに戻る</Link>
    </div>
  );
}

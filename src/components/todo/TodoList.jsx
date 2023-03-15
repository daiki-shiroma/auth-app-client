import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { Checkbox } from "@mantine/core";
import { CloseButton } from "@mantine/core";
import { List } from "@mantine/core";
import { Popover, Button, TextInput } from "@mantine/core";
import toggleComplete from "./toggleComplete";
import editTodoName from "./editTodoName";
import deleteTodo from "./deleteTodo";

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

const ButtonList = styled.li`
  list-style: none;
  padding-top: 20px;
`;

const CheckboxDiv = styled.div`
  padding-left: 30px;
  padding-top: 13px;
`;

function TodoList(props) {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");

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
                            getTodos();
                          }}
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
                        getTodos();
                      }
                      }
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
                        getTodos();
                      }}
                      title="Close popover"
                      size="xl"
                      iconSize={15}
                      color="red"
                    />
                  </div>
                </ButtonList>
              </TodoFlexList>
            </List.Item>
          </List>
        ))}
      </ul>
    </>
  );
}

export default TodoList;

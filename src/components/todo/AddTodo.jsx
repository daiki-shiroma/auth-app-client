import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, Text } from "@mantine/core";
import { Flex } from "@mantine/core";

export default function AddTodo(props) {
  const [todoName, setTodoName] = useState("");
  const [opened, { close, open }] = useDisclosure(false);

  const createTodo = () => {
    if (props.isloggedIn) {
      axios
        .post(`${process.env.REACT_APP_HOST}/todos`, {
          name: todoName,
          complete: false,
          user_id: props.user.id,
        })
        .then(() => {
          setTodoName("");
        })
    } else {
      alert("ログインして下さい！");
    }
    return;
  };

  const clearDoneTodo = () => {
    axios
      .delete(`${process.env.REACT_APP_HOST}/todos/done`)
  };

  const deleteAllTodo = () => {
    const ans = window.confirm("TODOリストを全て削除しますか？");
    if (ans) {
      axios
        .delete(`${process.env.REACT_APP_HOST}/todos/all`)
    }
  };

  return (
    <>
      <h1>Add New Todo</h1>
      <>
        <TextInput
          placeholder="Task name"
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          required
        />

        <Flex>
          <Button type="submit" onClick={(e) => todoName && createTodo(e)}>
            ADD
          </Button>

          <Modal
            opened={opened}
            onClose={close}
            size="auto"
            title="Select Button!!"
          >
            <Text>
              Delete only <b>Done Task?</b> or <b>All Task?</b>
            </Text>
            <Group mt="xl">
              <Button
                variant="outline"
                type="submit"
                onClick={() => {
                  clearDoneTodo();
                  close();
                }}
              >
                Clear Done Todo
              </Button>
              <Button
                variant="outline"
                type="submit"
                color="red"
                onClick={() => {
                  deleteAllTodo();
                  close();
                }}
              >
                Delete All Todo
              </Button>
            </Group>
          </Modal>

          <Group position="left">
            <Button color="red" onClick={open}>
              Delete
            </Button>
          </Group>
        </Flex>
      </>
    </>
  );
}

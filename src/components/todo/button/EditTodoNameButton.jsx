import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Popover, Button, TextInput } from "@mantine/core";

const ButtonList = styled.li`
  list-style: none;
  padding-top: 20px;
`;

export default function EditEditTodoNameButton(props) {

    const [todoName, setTodoName] = useState("");
    const editTodoName = async (id) => {
        await axios.put(`${process.env.REACT_APP_HOST}/todos/${id}`, {
            name: todoName,
        });
        setTodoName("");
    };

    return (
        <>
            <ButtonList>
                <div
                    style={{ display: props.todo.complete ? "none" : "block" }}
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
                                    editTodoName(props.todo.id, todoName);
                                    props.getTodos();
                                }}
                            >
                                Confirm
                            </Button>
                        </Popover.Dropdown>
                    </Popover>
                </div>
            </ButtonList>
        </>
    );
};


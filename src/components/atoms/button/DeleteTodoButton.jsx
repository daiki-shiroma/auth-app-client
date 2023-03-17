import React from "react";
import axios from "axios";
import styled from "styled-components";
import { CloseButton } from "@mantine/core";

const ButtonList = styled.li`
  list-style: none;
  padding-top: 20px;
`;

export default function DeleteTodoButton(props) {

    const deleteTodo = async (todoId) => {
        axios
            .delete(`${process.env.REACT_APP_HOST}/todos/${todoId}`)
            .then(() => props.getTodos())
            .catch(() => {
                window.alert("An error occurred. Please try again later.");
            });
    };
    return (
        <>
            <ButtonList>
                <div
                    style={{ display: props.todo.complete ? "none" : "block" }}
                >
                    <CloseButton
                        onClick={() => {
                            deleteTodo(props.todo.id);
                            props.getTodos()
                        }}
                        title="Close popover"
                        size="xl"
                        iconSize={15}
                        color="red"
                    />
                </div>
            </ButtonList>
        </>
    );
};


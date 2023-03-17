import React from "react";
import axios from "axios";
import styled from "styled-components";
import { Checkbox } from "@mantine/core";

const ButtonList = styled.li`
  list-style: none;
  padding-top: 20px;
`;

const CheckboxDiv = styled.div`
  padding-left: 30px;
  padding-top: 13px;
`;

export default function CheckTodoButton(props) {

    const toggleComplete = async (id, index, todos) => {
        const complete = todos[index].complete;
        await axios
            .put(`${process.env.REACT_APP_HOST}/todos/${id}`, {
                complete: !complete,
            })
            .catch(() => {
                window.alert("An error occurred. Please try again later.");
            })
    };

    return (
        <>
            <ButtonList>
                <CheckboxDiv>
                    <Checkbox
                        checked={props.todo.complete}
                        onClick={() => {
                            toggleComplete(props.todo.id, props.index, props.todos);
                            props.getTodos();
                        }
                        }
                    />
                </CheckboxDiv>
            </ButtonList>

        </>
    );
};


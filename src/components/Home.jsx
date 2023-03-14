import React from "react";
import styled from "styled-components";
import axios from "axios";
import TodoList from "./todo/TodoList";
import AddTodo from "./todo/AddTodo";
import HelloUser from "./user/HelloUser";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { Flex } from "@mantine/core";

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 50px auto;
`;

const ButtonDiv = styled.div`
  width:50%;
`;

export default function Home(props) {
  const isLoggedIn = props.isLoggedIn;
  const user = props.user;

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      axios
        .delete(`${process.env.REACT_APP_HOST}/logout`, {
          withCredentials: true,
        })
        .then(() => props.handleLogout())
    }
  };

  return (
    <>
      <h1>Home</h1>
      <HelloUser isLoggedIn={props.isLoggedIn} user={props.user} />
      <Wrapper>
        <AddTodo isLoggedIn={isLoggedIn} user={user} />
        <TodoList isLoggedIn={isLoggedIn} user={user} />
      </Wrapper>

      {props.isLoggedIn ? (
        <>
          <Flex direction="column">
            <ButtonDiv>
              <Button color="red" onClick={handleLogoutClick}>ログアウト</Button>
            </ButtonDiv>
            <Link to={`/dashboard`}>マイページはこちら</Link>
          </Flex>
        </>
      ) : (
        <>
          <Flex direction="column">
            <Link to="/Login">ログインはこちら</Link>
            <Link to="/Registration">新規登録はこちら</Link>
          </Flex>
        </>
      )}
    </>
  );
}

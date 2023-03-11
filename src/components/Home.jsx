import React from "react";
import styled from "styled-components";
import axios from "axios";
import TodoList from "./todo/TodoList";
import AddTodo from "./todo/AddTodo";
import HelloUser from "./user/HelloUser";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 700px;
  max-width: 85%;
  margin: 50px auto;
`;

export default function Home(props) {
  const loggedInStatus = props.loggedInStatus;
  const user = props.user;

  const handleLogoutClick = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      axios
        .delete(process.env.REACT_APP_HOST + "/logout", {
          withCredentials: true,
        })
        .then((response) => {
          props.handleLogout();
        })
        .catch();
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <HelloUser loggedInStatus={props.loggedInStatus} user={props.user} />
      <Wrapper>
        <AddTodo loggedInStatus={loggedInStatus} user={user} />
        <TodoList loggedInStatus={loggedInStatus} user={user} />
      </Wrapper>

      {props.loggedInStatus ? (
        <>
          <button onClick={handleLogoutClick}>ログアウト</button>
          <br />
          <Link to={`/Dashboard`}>マイページはこちら</Link>
        </>
      ) : (
        <>
          <Link to={`/Login`}>ログインはこちら</Link>
          <br />
          <Link to={`/Registration`}>新規登録はこちら</Link>
        </>
      )}
    </div>
  );
}

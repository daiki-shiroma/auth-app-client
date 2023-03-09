import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import TodoList from "./todo/TodoList";
import AddTodo from "./todo/AddTodo";

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
        .catch((error) => console.log("ログアウトエラー", error));
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <h2>
        こんにちは {props.loggedInStatus ? props.user.email : "ゲスト"} さん！
      </h2>

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

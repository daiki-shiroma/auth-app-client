import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Popover, Button, TextInput } from "@mantine/core";

export default function UserDelete(props) {
  const navigate = useNavigate();

  const deleteUser = () => {
    const user_id = props.user.id;

    if (window.confirm("Are you sure?")) {
      axios
        .delete(process.env.REACT_APP_HOST+"/user/"+user_id)
        .then(() => {
          props.handleLogout();
          navigate("/");
        })
        .catch(console.error());
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <h1>UserDelete</h1>
      <h2>
        こんにちは {props.loggedInStatus ? props.user.email : "ゲスト"}　さん！
      </h2>
      <p>ユーザーID: {props.loggedInStatus ? props.user.id : ""}</p>

      <Button type="submit" onClick={() => deleteUser()} color="red">
        Delete
      </Button>
      <br />
      <Link to={`/Dashboard`}>マイページへ戻る</Link>
      <br />
      <Link to={`/`}>ホームに戻る</Link>
    </div>
  );
}

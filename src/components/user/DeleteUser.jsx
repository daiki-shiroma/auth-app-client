import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { Button } from "@mantine/core";

import HelloUser from "./HelloUser";

export default function UserDelete(props) {
  const navigate = useNavigate();

  const deleteUser = () => {
    const userId = props.user.id;

    if (window.confirm("Are you sure?")) {
      axios
        .delete(process.env.REACT_APP_HOST + "/user/" + userId)
        .then(() => {
          props.handleLogout();
          navigate("/");
        })
        .catch();
    }
  };

  return (
    <div>
      <h1>UserDelete</h1>
      <HelloUser loggedInStatus={props.loggedInStatus} user={props.user} />

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

import React from "react";
import axios from "axios";
import HelloUser from "./HelloUser";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

export default function UserDelete(props) {
  const navigate = useNavigate();

  const deleteUser = () => {
    const userId = props.user.id;

    if (window.confirm("Are you sure?")) {
      axios
        .delete(process.env.REACT_APP_HOST + "/users/" + userId)
        .then(() => {
          props.handleLogout();
          navigate("/");
        })
    }
  };

  return (
    <>
      <h1>DeleteUser</h1>
      <HelloUser loggedInStatus={props.loggedInStatus} user={props.user} />
      <Button type="submit" onClick={() => deleteUser()} color="red">
        Delete
      </Button>
      <br />
      <Link to={`/dashboard`}>マイページへ戻る</Link>
      <br />
      <Link to={`/`}>ホームに戻る</Link>
    </>
  );
}

import React from "react";
import axios from "axios";
import HelloUser from "../../organisms/HelloUser";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { Flex } from "@mantine/core";

export default function UserDelete(props) {
  const navigate = useNavigate();

  const deleteUser = () => {
    const userId = props.user.id;
    if (window.confirm("Are you sure?")) {
      axios
        .delete(`${process.env.REACT_APP_HOST}/users/${userId}`)
        .then(() => {
          props.handleLogout();
          window.alert("Process is success!!")
        })
        .catch(() => {
          window.alert("An error occurred. Please try again later.");
        });
      navigate("/");
    }
  };

  return (
    <>
      <h1>DeleteUser</h1>
      <HelloUser isLoggedIn={props.isLoggedIn} user={props.user} />
      <Button type="submit" onClick={() => deleteUser()} color="red">
        Delete
      </Button>

      <Flex direction="column">
        <Link to="/dashboard">マイページへ戻る</Link>
        <Link to="/">ホームに戻る</Link>
      </Flex>
    </>
  );
}

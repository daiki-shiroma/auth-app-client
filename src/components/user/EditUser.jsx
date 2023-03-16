import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import HelloUser from "./HelloUser";
import { Button, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PasswordInput } from "@mantine/core";
import { Flex } from "@mantine/core";

const UserEditForm = styled.form`
  width: 700px;
  max-width: 75%;
  margin: 20px auto;
`;

const ButtonDiv = styled.div`
  text-align: right;
  margin-top: 20px;
`;

export default function EditUser(props) {
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visible, { toggle }] = useDisclosure(true);
  const user_id = props.user.id;

  const navigate = useNavigate();
  const handleSubmitEmail = (event) => {
    axios
      .put(`${process.env.REACT_APP_HOST}/user_email/${user_id}`, {
        email: email,
      })
      .then((response) => {
        if (response.data.status === 200) {
          window.alert("Email Change is success!!")
          navigate("/dashboard");
        }
      })
      .catch(() => {
        window.alert("Already Registered!")
        navigate("/dashboard");
      });
    event.preventDefault();
  };

  const handleSubmitPassword = (event) => {
    axios
      .put(`${process.env.REACT_APP_HOST}/user_password/${user_id}`, {
        user: {
          password: password,
        }
      })
      .then((response) => {
        if ((response.data.status = 200)) {
          window.alert("Password Change is success!!")
          navigate("/dashboard");
        }
      })
      .catch(() => {
        window.alert("Cannot Change Password")
        navigate("/dashboard");
      });
    event.preventDefault();
  };

  return (
    <>
      <h1>EditUser</h1>
      <HelloUser isLoggedIn={props.isLoggedIn} user={props.user} />
      <UserEditForm onSubmit={handleSubmitEmail}>
        <p>メールアドレス変更</p>
        <TextInput
          placeholder="New email"
          label="New email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextInput
          placeholder="Confirm email"
          label="Confirm email"
          value={emailConfirmation}
          type="email"
          onChange={(e) => setEmailConfirmation(e.target.value)}
          required
        />
        <ButtonDiv>
          <Button type="submit">Change email</Button>
        </ButtonDiv>
      </UserEditForm>

      <UserEditForm onSubmit={handleSubmitPassword}>
        <p>パスワード変更</p>
        <PasswordInput
          label="New Password"
          visible={visible}
          onVisibilityChange={toggle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <PasswordInput
          label="Confirm Password"
          visible={visible}
          onVisibilityChange={toggle}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <ButtonDiv>
          <Button type="submit">Change password</Button>
        </ButtonDiv>
      </UserEditForm>

      <Flex direction="column">
        <Link to="/dashboard">マイページへ戻る</Link>
        <Link to="/">ホームに戻る</Link>
      </Flex>
    </>
  );
}

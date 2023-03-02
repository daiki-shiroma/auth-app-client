import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TextInput, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PasswordInput } from "@mantine/core";
import { Button } from "@mantine/core";

const Wrapper = styled.form`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`;

const Button_div = styled.div`
  text-align: right;
  margin-top: 20px;
`;

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, { toggle }] = useDisclosure(true);

  const navigate = useNavigate();

  const handleSuccessfulAuthentication = (data) => {
    console.log(data);
    props.handleLogin(data);
    navigate("/dashboard", data);
  };

  const handleLoginError = (data) => {
    navigate("/LoginError");
  };

  const handleSubmit = (event) => {
    axios
      .post(
        "https://rails-api-auth.fly.dev/login",
        {
          user: {
            email: email,
            password: password,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.logged_in) {
          handleSuccessfulAuthentication(response.data);
        } else if (response.data.status == 401) {
          console.log(
            "認証に失敗しました。正しいメアド・パスワードを入れて下さい。"
          );
          handleLoginError();
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
    event.preventDefault();
  };

  return (
    <>
      <h1>ログインページ</h1>
      <Wrapper onSubmit={handleSubmit}>
        <TextInput
          placeholder="Your email"
          label="Your email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <PasswordInput
          label="Password"
          visible={visible}
          onVisibilityChange={toggle}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button_div>
          <Button
            type="submit"
          >
            Login
          </Button>
        </Button_div>
      </Wrapper>

      <Link to={`/`}>ホームに戻る</Link>
    </>
  );
}

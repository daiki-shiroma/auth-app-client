import React from "react";
import useState from "react";
import axios from "axios";
import styled from "styled-components";
import HelloUser from "./HelloUser";
import { useDisclosure } from "@mantine/hooks";
import { PasswordInput } from "@mantine/core";
import { Button, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";

const Wrapper = styled.form`
  width: 700px;
  max-width: 75%;
  margin: 20px auto;
`;

const ButtonDiv = styled.div`
  text-align: right;
  margin-top: 20px;
`;

export default function UserEdit(props) {
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visible, { toggle }] = useDisclosure(true);
  const userId = props.user.id;

  const navigate = useNavigate();
  const handleSubmitEmail = (event) => {
    axios
      .put(process.env.REACT_APP_HOST + "/user_email/" + userId, {
        user: {
          email: email,
        },
      })
      .then((response) => {
        if ((response.data.status = 200)) {
          window.alert("Email Change is success!!");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        window.alert("Already Registered!");
        navigate("/dashboard");
      });
    event.preventDefault();
  };

  const handleSubmitPassword = (event) => {
    axios
      .put(process.env.REACT_APP_HOST + "/user_password/" + userId, {
        user: {
          password: password,
        },
      })
      .then((response) => {
        if ((response.data.status = 200)) {
          window.alert("Password Change is success!!");
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        window.alert("Cannot Change Password");
        navigate("/dashboard");
      });
    event.preventDefault();
  };

  return (
    <>
      <h1>UserEdit</h1>
      <HelloUser loggedInStatus={props.loggedInStatus} user={props.user} />
      <Wrapper onSubmit={handleSubmitEmail}>
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
      </Wrapper>

      <Wrapper onSubmit={handleSubmitPassword}>
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
      </Wrapper>
      <Link to={`/Dashboard`}>マイページへ戻る</Link>
      <br />
      <Link to={`/`}>ホームに戻る</Link>
    </>
  );
}

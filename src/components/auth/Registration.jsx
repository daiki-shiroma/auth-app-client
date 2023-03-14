import { React, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { TextInput, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PasswordInput } from "@mantine/core";
import { Button } from "@mantine/core";

const RegistrationForm = styled.form`
  width: 700px;
  max-width: 85%;
  margin: 20px auto;
`;

const ButtonDiv = styled.div`
  text-align: right;
  margin-top: 20px;
`;

export default function Registration(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visible, { toggle }] = useDisclosure(true);
  const [emailRequired, setemailRequired] = useState(false);
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [checkPasswordRequired, setcheckPasswordRequired] = useState(false);

  const navigate = useNavigate();

  const handleSuccessfulAuthentication = (data) => {
    props.handleLogin(data);
    navigate("/dashboard", data);
  };

  const handleDuplicatedRegistrationError = () => {
    navigate("/DuplicatedRegistrationError");
  };

  const handleNewRegistrationError = () => {
    navigate("/NewRegistrationError");
  };

  const handleSubmit = (event) => {
    axios
      .post(
        process.env.REACT_APP_HOST + "/signup",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: passwordConfirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          handleSuccessfulAuthentication(response.data);
        } else if ((response.data.status === 200)) {
          handleDuplicatedRegistrationError();
        }
        else handleNewRegistrationError();
      })
    event.preventDefault();
  };

  const checkEmail = (e) => {
    const regex = /^[a-zA-Z0-9_+-]+(\.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (regex.test(e)) setemailRequired(true);
    else setemailRequired(false);
  };

  const checkPassword = () => {
    if (password.length > 5) setPasswordRequired(true);
    else setPasswordRequired(false);

    if (
      (password === passwordConfirmation) &
      (password.length === passwordConfirmation.length)
    ) {
      setcheckPasswordRequired(true);
    } else setcheckPasswordRequired(false);
  };

  return (
    <>
      <h1>新規ユーザー登録ページ</h1>
      <RegistrationForm onSubmit={handleSubmit}>
        <TextInput
          type="email"
          name="email"
          placeholder="Your email"
          label="Your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          onKeyUp={(e) => checkEmail(e.target.value)}
          required
          rightSection={<Loader size="xs" />}
          withAsterisk
        />
        <PasswordInput
          label="Password"
          visible={visible}
          onVisibilityChange={toggle}
          withAsterisk
          value={password}
          minLength="6"
          onChange={(event) => setPassword(event.target.value)}
          onKeyUp={(e) => checkPassword(e.target.value)}
          error={
            passwordRequired
              ? false
              : "Password must input at least 6 characters"
          }
          required
        />

        <PasswordInput
          label="Confirm password"
          visible={visible}
          onVisibilityChange={toggle}
          withAsterisk
          minLength="6"
          required
          value={passwordConfirmation}
          onChange={(event) => setPasswordConfirmation(event.target.value)}
          onKeyUp={(e) => checkPassword(e.target.value)}
          error={checkPasswordRequired ? false : "Password isn't match!!"}
        />

        <ButtonDiv>
          <Button
            type="submit"
            disabled={
              emailRequired & checkPasswordRequired & passwordRequired
                ? false
                : true
            }
          >
            Register
          </Button>
        </ButtonDiv>
      </RegistrationForm>
      <Link to="/">ホームに戻る</Link>
    </>
  );
}

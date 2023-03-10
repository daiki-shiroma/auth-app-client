import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import styled from "styled-components";
import { Checkbox } from "@mantine/core";
import { CloseButton } from "@mantine/core";
import { List } from "@mantine/core";
import { Popover, Button, TextInput } from "@mantine/core";
import { Modal, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PasswordInput } from "@mantine/core";

const Wrapper = styled.form`
  width: 700px;
  max-width: 75%;
  margin: 20px auto;
`;

const Button_div = styled.div`
  text-align: right;
  margin-top: 20px;
`;

export default function UserEdit(props) {
  const [email, setEmail] = useState("");
  const [emailConfirmation, setEmailConfirmation] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visible, { toggle }] = useDisclosure(true);
  const user_id = props.user.id;

  const navigate = useNavigate();
  const handleSubmitEmail = (event) => {
    axios
      .put(process.env.REACT_APP_HOST+"/user_email/"+user_id, {
        email: email,
      })
      .then((response) => {
        console.log(response);
        if ((response.data.status = 200)) {
            window.alert("Email Change is success!!")
            navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log("edit error", error);
        window.alert("Already Registered!")
        navigate("/dashboard");
      });
    event.preventDefault();
  };

  const handleSubmitPassword = (event) => {
    axios
      .put(process.env.REACT_APP_HOST+"/user_password/"+user_id, {
        user :{
          password: password,
        }
      })
      .then((response) => {
        if ((response.data.status = 200)) {
          console.log(response);
          window.alert("Password Change is success!!")
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log("edit error", error);
        window.alert("Cannot Change Password")
        navigate("/dashboard");
      });
  
    event.preventDefault();
  };

  useEffect(() => {}, []);

  return (
    <>
      <h1>UserEdit</h1>
      <h2>
        ??????????????? {props.loggedInStatus ? props.user.email : "?????????"}????????????
      </h2>
      <p>????????????ID: {props.loggedInStatus ? props.user.id : ""}</p>

      <Wrapper onSubmit={handleSubmitEmail}>
        <p>???????????????????????????</p>
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
        <Button_div>
          <Button type="submit">Change email</Button>
        </Button_div>
      </Wrapper>

      <Wrapper onSubmit={handleSubmitPassword}>
        <p>?????????????????????</p>????????????
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
        <Button_div>
          <Button type="submit">Change password</Button>
        </Button_div>
      </Wrapper>
      <Link to={`/Dashboard`}>????????????????????????</Link>
      <br />
      <Link to={`/`}>??????????????????</Link>
    </>
  );
}

import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import styled from 'styled-components'
import { Checkbox } from '@mantine/core';
import { CloseButton } from '@mantine/core';
import { List } from '@mantine/core';
import { Popover, Button, TextInput } from '@mantine/core';

const Task_ul  =styled.ul`

`;

const Task_li  =styled.li`

list-style:none;
font-size:25px;
display:flex;
`;

const TaskName_div = styled.div`
  width:350px;
`;

const TaskName = styled.p`
 width:100%;
 word-wrap: break-word;
`;


const Button_li = styled.li`
  list-style:none;
  padding-top:20px;
 
`;

const Checkbox_div = styled.div`
  padding-left:30px;
  padding-top:13px;
`;

const Edit_div=styled.div`
`;

const CloseButton_div=styled.div`
`;



export default function UserEdit(props) {

  useEffect(() => 
  {
    
  }, []);

  return (
    <div>
      <h1>UserEdit</h1>
      <h2>
        こんにちは {props.loggedInStatus ? props.user.email : "ゲスト"}　さん！
      </h2>
      <p>ユーザーID: {props.loggedInStatus ? props.user.id : ""}</p>
   
      <Link to={`/Dashboard`}>マイページへ戻る</Link>
      <br/>
      <Link to={`/`}>ホームに戻る</Link>
    </div>
  );
}

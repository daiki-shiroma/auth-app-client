import React, { useState, useEffect } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Group, Text } from '@mantine/core';

function AddTodo() {
  const [todos, setTodos] = useState([]);
  const [todoName, setTodoName] = useState("");
  const [opened, { close, open }] = useDisclosure(false);
  
  const Button_div  =styled.div`
  display:flex;
`;

  const getTodos = () => {
    return axios
     .get("http://localhost:3001/todos")
    //  .get("https://wispy-wind-1056.fly.dev/todos")
      .then((res) => {
        if (res !== ''){
          setTodos(res.data);
        }
      })
      .catch(() => console.error);
  };

  const createTodo = (e) => {
  
    if (todoName!==''){
     axios
     .post("http://localhost:3001/todos", {
      // .post("https://wispy-wind-1056.fly.dev/todos", {
       name: todoName,
       complete: false,
     })
     .then(() => {
       setTodoName("");
     })
     .catch(() => console.error);
    }
    else{
     alert("入力欄が空です");
    }
    return;
 };

 const ClearDoneTask=()=>{
    axios.delete(`http://localhost:3001/todos/destroy_doneTask`)
    //  axios.delete(`https://wispy-wind-1056.fly.dev/todos/destroy_doneTask`)
     .then(()=> {
      
     })
     .catch(e => {
       console.log(e)
    })
 
};

const deleteAllTodo=()=>{
   let res=window.confirm("TODOリストを全て削除しますか？");
    if (res) {
      axios.delete(`http://localhost:3001/todos/destroy_all`)
      // axios.delete(`https://wispy-wind-1056.fly.dev/todos/destroy_all`)
      .then(()=> {
        setTodos([])
      })
      .catch(e => {
        console.log(e)
     })
  }
};

useEffect(() => {
  getTodos();
}, []);

  return (
    <>
      <h1>Add New Todo</h1>
      <>
          <TextInput
            placeholder="Task name"
            type="text"
            value={todoName}
            onChange={(e) => setTodoName(e.target.value)}
          />
        
      <Button_div >
       <Button type="submit" onClick={(e) => createTodo(e)}>
          ADD
        </Button>
        
       <Modal opened={opened} onClose={close} size="auto" title="Select Button!!">
        <Text>Delete only <b>Done Task?</b> or <b>All Task?</b></Text>
         <Group mt="xl">
          <Button variant="outline" type="submit"   onClick={() => ClearDoneTask()}>
            Clear Done Task
          </Button>
          <Button variant="outline" type="submit"  color="red"  onClick={() => deleteAllTodo()}>
            Delete All Task
          </Button>
        </Group>
       </Modal>

       <Group position="left" >
        <Button color="red" onClick={open}>Delete</Button>
       </Group>
      </Button_div>

      </>
    </>
  )
}

export default AddTodo
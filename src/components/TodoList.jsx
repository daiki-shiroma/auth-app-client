import React, { useState, useEffect } from 'react'
import axios from 'axios'
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
  width:450px;
 
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


function TodoList() {
  const [todos, setTodos] = useState([]);  
  const [todoName, setTodoName] = useState("");

  const getTodos = () => {
    return axios
      .get("http://localhost:3001/todos")
      // .get("https://wispy-wind-1056.fly.dev/todos")
      .then((res) => {
        if (res !== ''){
          setTodos(res.data);
        }
      })
      .catch(() => console.error);
  };

  const toggleComplete = async (id, index) => {
    const complete = todos[index].complete;
    await axios.put(`http://localhost:3001/todos/${id}`, {
      //  await axios.put(`https://wispy-wind-1056.fly.dev/todos/${id}`, {
      complete: !complete,
    });
    getTodos();
  };

  const editTaskName = async (e,id) => {
    await axios.put(`http://localhost:3001/todos/${id}`, {
      //  await axios.put(`https://wispy-wind-1056.fly.dev/todos/${id}`, {
      name: todoName
    });
    getTodos();
  };


  const deleteTodo = async(todoId,index) => {

    const complete = todos[index].complete;
    await axios.put(`http://localhost:3001/todos/${todoId}`, {
      // await axios.put(`https://wispy-wind-1056.fly.dev/todos/${todoId}`, {
      complete: !complete
    });

    axios.delete(`http://localhost:3001/todos/${todoId}`)
    // axios.delete(`https://wispy-wind-1056.fly.dev/todos/${todoId}`)
      .then(() => 
      getTodos()
      )
      .catch(console.error());

  };


  useEffect(() => 
  {getTodos();}, [todos]);
  

  return (
    <>
      <h1>Your Todo List</h1>
      <Task_ul>
      {todos.map((todo, index) => (
        <List size="xl">
        <List.Item> 
        <Task_li index={index}>
           
          <TaskName_div> 
            <TaskName>{todo.complete ? <s>{todo.name}</s>: todo.name}
            </TaskName>
          </TaskName_div>

          <Button_li>
          <Edit_div style={{display: todo.complete?  "none":"block" }} >
            <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
              <Popover.Target>
                <Button size="xs" color="dark">Edit</Button>
               </Popover.Target>
             <Popover.Dropdown >
               <TextInput label="New task name" placeholder="" size="xs" 
               type="text"
               value={todoName}
               onChange={(e) => setTodoName(e.target.value)}/>
                <Button size="xs" color="dark" type="submit" onClick={(e) => editTaskName(e,todo.id)}>Change</Button>
             </Popover.Dropdown>
            </Popover>
          </Edit_div>
          </Button_li>
         
          <Button_li>
            <Checkbox_div>
             <Checkbox  checked={todo.complete ? true: false} onClick={() => toggleComplete(todo.id, index)}/>
            </Checkbox_div>
          </Button_li>

          <Button_li>
            <CloseButton_div style={{display: todo.complete?  "none":"block" }}>
             <CloseButton  onClick={() => deleteTodo(todo.id, index)} title="Close popover" size="xl" iconSize={15} color="red" />
            </CloseButton_div>
          </Button_li>
          
        </Task_li>
        </List.Item>
           </List>
      ))}
    </Task_ul>

    </>
  )
}

export default TodoList
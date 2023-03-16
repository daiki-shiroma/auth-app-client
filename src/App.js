import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Dashboard from "./components/user/Dashboard";
import EditUser from "./components/user/EditUser";
import DeleteUser from "./components/user/DeleteUser";
import HelloUser from "./components/user/HelloUser";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import LoginError from "./components/error/LoginError";
import DuplicatedRegistrationError from "./components/error/DuplicatedRegistrationError";
import NewRegistrationError from "./components/error/NewRegistrationError";
import NotFound from "./components/error/NotFound";
import TodoList from "./components/todo/TodoList";
import AddTodo from "./components/todo/AddTodo";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
  };

  const checkLoginStatus = () => {
    axios
      .get(`${process.env.REACT_APP_HOST}/logged_in`, {
        withCredentials: true,
      })

      .then((response) => {
        if (response.data.logged_in && !isLoggedIn) {
          setIsLoggedIn(true);
          setUser(response.data.user);
        } else if (!response.data.logged_in && isLoggedIn) {
          setIsLoggedIn(false);
          setUser({});
        }
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
  };

  const onUnload = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener("beforeunload", onUnload);
    return () => {
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={
            <Home
              user={user}
              handleLogout={handleLogout}
              isLoggedIn={isLoggedIn}
            />
          }
        />
        <Route
          path='/dashboard'
          element={
            <Dashboard
              isLoggedIn={isLoggedIn}
              user={user}
              checkLoginStatus={checkLoginStatus}
            />
          }
        />
        <Route
          path='/edituser'
          element={
            <EditUser
              isLoggedIn={isLoggedIn}
              user={user}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path='/deleteuser'
          element={
            <DeleteUser
              isLoggedIn={isLoggedIn}
              user={user}
              handleLogout={handleLogout}
            />
          }
        />
        <Route
          path='/hellouser'
          element={<HelloUser isLoggedIn={isLoggedIn} user={user} />}
        />
        <Route
          path='/Registration'
          element={<Registration handleLogin={handleLogin} />}
        />
        <Route
          path='/Login'
          element={<Login isLoggedIn={isLoggedIn} handleLogin={handleLogin} />}
        />
        <Route path='/LoginError' element={<LoginError />} />
        <Route
          path='/DuplicatedRegistrationError'
          element={<DuplicatedRegistrationError />}
        />
        <Route
          path='/NewRegistrationError'
          element={<NewRegistrationError />}
        />
        <Route path='/*' element={<NotFound />} />
        <Route path='/AddTodo' element={<AddTodo />} />
        <Route path='/TodoList' element={<TodoList />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

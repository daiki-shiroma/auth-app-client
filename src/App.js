import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Dashboard from "./components/user/Dashboard";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";
import LoginError from "./components/error/LoginError";
import RegistrationError from "./components/error/RegistrationError";
import NotFound from "./components/error/NotFound";
import TodoList from "./components/todo/TodoList";
import AddTodo from "./components/todo/AddTodo";


export default function App() {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
  const [user, setUser] = useState({});

  const handleLogin = (data) => {
    setLoggedInStatus(true);
    setUser(data.user);
  };

  const checkLoginStatus = () => {
    axios
      .get("https://rails-api-auth.fly.dev/logged_in", {
        withCredentials: true,
      })

      .then((response) => {
        if (response.data.logged_in && !loggedInStatus) {
          setLoggedInStatus(true);
          setUser(response.data.user);
          console.log(response.data.id);
          
        } else if (!response.data.logged_in && loggedInStatus) {
          setLoggedInStatus(false);
          setUser({});
        }
      })

      .catch((error) => {
        console.log("ログインエラー", error);
      });
  };

  const handleLogout = () => {
    setLoggedInStatus(false);
    setUser({});
  };

  useEffect(() => {
    checkLoginStatus();
  });

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                handleLogout={handleLogout}
                loggedInStatus={loggedInStatus}
              />
            }
          />
          <Route
            path="/dashboard"
            element={<Dashboard loggedInStatus={loggedInStatus} user={user} />}
          />
          <Route
            path="/Registration"
            element={<Registration handleLogin={handleLogin} />}
          />
          <Route
            path="/Login"
            element={
              <Login
                loggedInStatus={loggedInStatus}
                handleLogin={handleLogin}
              />
            }
          />
          <Route path="/LoginError" element={<LoginError />} />
          <Route path="/RegistrationError" element={<RegistrationError />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/AddTodo" element={<AddTodo />} />
          <Route path="/TodoList" element={<TodoList />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

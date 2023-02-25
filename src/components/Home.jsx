import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home(props) {
  const handleLogoutClick = () => {
      if ( window.confirm("Are you sure you want to log out?")){
        axios
        .delete("http://localhost:3001/logout", { withCredentials: true })
        .then((response) => {
          props.handleLogout();
        })
        .catch((error) => console.log("ログアウトエラー", error));
      }
  };

  return (
    <div>
      <h1>Home</h1>
      <h2>
        こんにちは {props.loggedInStatus ? props.user.email : "ゲスト"} さん！
      </h2>

      {props.loggedInStatus ? (
        <button onClick={handleLogoutClick}>ログアウト</button>
      ) : (
        <>
          <Link to={`/Login`}>ログインはこちら</Link>
          <br/>
          <Link to={`/Registration`}>新規登録はこちら</Link>
        </>
      )}
    </div>
  );
}

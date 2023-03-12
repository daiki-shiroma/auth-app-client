import React from "react";
import { Link } from "react-router-dom";

export default function DuplicatedRegistrationError(props) {
  return (
    <>
      <h1>DuplicatedRegistrationError</h1>
      <h2>既に登録されています！</h2>
      <Link to={`/`}>ホームに戻る</Link>
    </>
  );
}

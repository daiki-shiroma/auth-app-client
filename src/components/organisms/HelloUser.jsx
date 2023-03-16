import React from "react";

export default function HelloUser(props) {
  return (
    <>
      {props.isLoggedIn ? (
        <>
          <h2>こんにちは {props.user.email} さん！</h2>
          <p>ユーザーID: {props.user.id}</p>
        </>
      ) : (
        <>
          <h2>ゲスト さん！</h2>
        </>
      )}
    </>
  );
}

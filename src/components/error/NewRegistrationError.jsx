import React from "react";
import { Link } from "react-router-dom";

export default function NewRegistrationError() {
    return (
        <>
            <h1>NewRegistrationError</h1>
            <h2>登録に失敗しました</h2>
            <Link to={`/`}>ホームに戻る</Link>
        </>
    );
}

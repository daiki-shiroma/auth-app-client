import React from 'react'
import { Link } from "react-router-dom";

export default function LoginError() {

    return (
        <>
            <h1>LoginError</h1>
            <h2>ログインに失敗しました</h2>
            <Link to="/">ホームに戻る</Link>
        </>
    )
}

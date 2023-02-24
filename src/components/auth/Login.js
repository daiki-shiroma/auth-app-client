import React, { useState } from 'react'
import axios from 'axios'

// Login関数コンポーネントへ書き換え
export default function Login(props) {
    // password_confirmationフィールドを削除
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (event) => {
        axios.post("http://localhost:3001/login",
            {
                user: {
                    email: email,
                    password: password,
                }
            },
            { withCredentials: true }
        ).then(response => {

            // 変更
            if (response.data.logged_in) {
                props.handleSuccessfulAuthentication(response.data)
            }

        }).catch(error => {
            console.log("registration error", error)
        })
        event.preventDefault()
    }

    return (
        <div>
            {/* ログインに変更 */}
            <p>ログイン</p>

            {/* フォーム内のpassword_confrmation入力フィールド削除 */}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="メールアドレス"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="パスワード"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <button type="submit">ログイン</button>
            </form>
        </div>
    )
}
import React from 'react'
import Registration from './auth/Registration'
import {useNavigate} from "react-router-dom"
import Login from './auth/Login'
import axios from 'axios'


export default function Home(props) {
    const navigate = useNavigate()    

    const handleSuccessfulAuthentication = (data) => {
        console.log(data);
        props.handleLogin(data);
        navigate("/dashboard",data);
    }

    const handleLoginError = (data) => {
        navigate("/LoginError");
    }

    const handleLogoutClick = () => {
        axios.delete("http://localhost:3001/logout", { withCredentials: true })
            .then(response => {
                props.handleLogout()
            }).catch(error => console.log("ログアウトエラー", error))
    }


    return (
        <div>
            <h1>Home</h1>
            <h2>ログイン状態: {props.loggedInStatus}</h2>
            <button onClick={handleLogoutClick}>ログアウト</button>
            <Registration handleSuccessfulAuthentication={handleSuccessfulAuthentication}/>
            <Login handleSuccessfulAuthentication={handleSuccessfulAuthentication} handleLoginError={handleLoginError}/>
        </div>
    )
}
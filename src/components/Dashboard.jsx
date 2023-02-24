import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Dashboard(props) {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>ログイン状態: {props.loggedInStatus}</h2>
            <h2> {props.email}</h2>
            <Link to={`/`}>ホームに戻る</Link>

        </div>
    )
}
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Dashboard(props) {
    
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>こんにちは {props.loggedInStatus? props.user.email:"ゲスト"}　さん！</h2>
            <Link to={`/`}>ホームに戻る</Link>

        </div>
    )
}
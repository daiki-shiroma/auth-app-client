import React from 'react'
import { useState, useEffect } from 'react';

export default function Dashboard(props) {
    // const [value, setValue] = useState(props);

    // useEffect(() => {
    //     setValue(props);
    //   }, [props]);
    
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>ログイン状態: {props.loggedInStatus}</h2>
            <h2> {props.email}</h2>
        </div>
    )
}
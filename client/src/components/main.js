import React, { useEffect, useContext } from 'react';
import AppContext from "../context/appContext";

function Main(props) {
    const { authenLogin } = useContext(AppContext)
    console.log(authenLogin)
    useEffect(() => {

    }, []);

    return (
        <div>
            <h2>Main page...</h2>
            <button onClick={() => props.history.goBack()}>Log out</button>
        </div>
    )
}

export default Main

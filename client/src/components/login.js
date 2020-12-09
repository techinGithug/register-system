import React, { useState, useEffect, useContext } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import AppContext from "../context/appContext";

const Login = ( props ) => {
    const { response, types, login } = useContext(AppContext)
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [type, setType] = useState()
    const [token, setToken] = useState()

    useEffect(() => {
        
    }, [type]);

    const handleRegister = () => {
        props.history.push("/register")
    }

    const handleLogin = () => {
        if(username !== "" && password !== "") {
            response.map(item => {
                if(username === item.username && password === item.password) {
                    let token = genToken()
                    const authLogin = {
                        "token": token,
                        "login": true
                    }
                    login(authLogin)
                    props.history.push("/main")
                    return
                }
            });
        
        } else {
            // login(false)
        }
        
    }

    const genToken = () => {
        let pass = ""; 
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +  
                'abcdefghijklmnopqrstuvwxyz0123456789@#$'; 
          
        for (let i = 1; i <= 15; i++) { 
            var char = Math.floor(Math.random() 
                        * str.length + 1); 
              
            pass += str.charAt(char) 
        } 
        return pass
    }

    return (
        <div className="w-25 mx-auto mt-5">
            <form className="form align-middle">
                <div className="form-group">
                    <label for="username">Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" for="inputGroupType">Types</label>
                    </div>
                    <select className="custom-select" id="inputGroupType"
                        onChange={(e) => setType({ type: e.target.value })}
                    >
                        {
                            types.map(type => (
                                <option key={type.id} value={type.id}>{type.label}</option>
                            ))
                        }
                        
                        {/* <option value={type} selected>Student</option>
                        <option value={type}>Teacher</option> */}
                    </select>
                </div>

                <div className="text-center">
                    <button type="button" className="btn btn-secondary mr-1" onClick={() => handleLogin()}>Login</button>
                    <button type="button" className="btn btn-secondary" onClick={() => handleRegister()}>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Login

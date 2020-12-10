import React, { useState, useEffect, useContext } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";
import AppContext from "../context/appContext";

const Login = ( props ) => {
    const { students, login } = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState({type: "1"})
    const [isError, setIsError] = useState(false);

    const types = [
        {id:"1", label:"Student"},
        {id:"2", label:"Teacher"}
    ]

    useEffect(() => {
        // console.log("Type... ",type.type)
    }, [type, isError]);

    const handleRegister = () => {
        const id = type.type
        if(id === "1") { // 1 is student
            props.history.push("/register-student")
        }
        if(id === "2") { // 2 is teacher
            props.history.push("/register-teacher")
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if(username !== "" && password !== "") {
            const id = type.type
            if(id === "1") { // 1 is student
                let isFound = checkStudent()
                if(isFound) {
                    props.history.push("/student")
                }
            }
            if(id === "2") { // 2 is teacher
                
                // props.history.push("/teacher")
            }
        
        } else {
            setIsError(true)
            setTimeout(() => {
                setIsError(false)
            }, 5000);
        }
    }

    const checkStudent = () => {
        let res = false
        students.map(item => {
            if(username === item.username && password === item.password) {
                let token = genToken()
                const authLogin = {
                    token: token,
                    isLogin: true,
                    id:item.id
                }
                login(authLogin)
                // props.history.push("/main")
                res = true
            }
        });
        return res
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
            <div className="text-center mb-4"><h3>Login</h3></div>
            <form className="form align-middle" onSubmit={(e) => handleLogin(e)}>
                <div className="form-group">
                    <label>Username</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Type</label>
                    <select className="custom-select"
                        onChange={(e) => setType({ type: e.target.value })}
                    >
                    {
                        types.map(item => 
                            <option key={item.id} value={item.id}>{item.label}</option>
                        )
                    }
                        {/* <option value={type} selected>Student</option>
                        <option value={type}>Teacher</option> */}
                    </select>
                </div>

                <div className="text-center">
                    <button type="submit" className="btn btn-light mr-1">Login</button>
                    <button type="button" className="btn btn-light" onClick={() => handleRegister()}>Register</button>
                </div>
                {isError && (
                    <div className="alert alert-danger mt-4" role="alert">
                        Username or password incorrect!
                    </div>
                )}
               
            </form>
        </div>
    )
}

export default Login

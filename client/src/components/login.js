import React, { useState, useEffect, useContext } from 'react';
import { IoAirplane, IoPersonCircleOutline } from "react-icons/io5";
import AppContext from "../context/appContext";
import Webconfig from '../api/web-config';

import { 
    IoCreateOutline,
    IoLogInOutline
 } from "react-icons/io5";


const Login = ( props ) => {
    const { login, getUserDataByUsername, genToken } = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [type, setType] = useState({type: "1"})
    const [isError, setIsError] = useState(false)
    const [message, setMessage] = useState("")

    const types = [
        {id:"1", label:"Student"},
        {id:"2", label:"Teacher"}, 
        {id:"3", label:"Admin"}
    ];

    useEffect(() => {
        
    }, [type, isError]);    

    const handleRegister = () => {
        const id = type.type
        if(id === "1") { // 1 is student
            props.history.push("/student-register")
        }
        if(id === "2") { // 2 is teacher
            props.history.push("/register-teacher")
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if(username !== "" && password !== "") {
            const id = type.type
            if(id === "1") { // 1 is student
                const res = await getUserDataByUsername(username)
                // console.log(res)
                const { status, statusText, ok, url } = res
                if(ok) {
                    const jsonData = await res.json()
                    if(jsonData.length > 0) {
                        const {regist_username: user, regist_password: pass, regist_type: type, is_block } = jsonData[0]
                        if(username === user && password === pass && id === type) {
                            if(is_block === "1") {
                                setMessage("This user was blocked")
                                setIsError(true)
                                setTimeOut()
                            } else {
                                let token = genToken()
                                const authLogin = {
                                token: token,
                                isLogin: true,
                                userData: jsonData[0]
                            }
                            login(authLogin)
                            props.history.push("/student")
                            }
                            
                        } else {
                            setMessage("Username or password incorrect!")
                            setIsError(true)
                            setTimeOut()
                        }

                    } else {
                        // console.log("No data...")
                        setMessage("This user not found. please register!")
                        setIsError(true)
                        setTimeOut()
                    }

                } else if(!ok) {
                    console.log(`${status} ${statusText} this ${url}`)
                    setMessage(`${status} ${statusText}`)
                    setIsError(true)
                    setTimeOut()
                }
               
            } else  if(id === "2") { // 2 is teacher
                // const res = await fetch(Webconfig.getTeacherByUsername(username), {
                //     method: "GET"
                // });
                const res = await getUserDataByUsername(username)
                const { status, statusText, ok, url } = res
                if(ok) {
                    const jsonData = await res.json()
                    if(jsonData.length > 0) {
                        const { regist_username: user, regist_password: pass, regist_type: type} = jsonData[0]
                        if(username === user && password === pass && id === type) {
                            let token = genToken()
                            const authLogin = {
                                token: token,
                                isLogin: true,
                                userData: jsonData[0]
                            }
                            login(authLogin)
                            // setLocalStorage(authLogin)
                            props.history.push("/teacher")

                        } else {
                            setMessage("Username or password incorrect!")
                            setIsError(true)
                            setTimeOut()
                        }
                    } else {
                        setMessage("This user not found. please register!")
                        setIsError(true)
                        setTimeOut()
                    }

                } else if(!ok){
                    console.log(`${status} ${statusText} this ${url}`)
                    setMessage(`${status} ${statusText}`)
                    setIsError(true)
                    setTimeOut()
                }

            } else if(id === "3") { // 3 is admin
                try {
                    const res = await fetch(Webconfig.getAdminByUsername(username), {
                        method: "GET"
                    });
                    const { status, statusText, ok, url } = res
                    if(ok) {
                        const jsonData = await res.json()
                        console.log(jsonData)
                        if(jsonData.length > 0) {
                            const { am_username: user, am_password: pass} = jsonData[0]
                            if(username === user && password === pass) {
                                let token = genToken()
                                const authLogin = {
                                    token: token,
                                    isLogin: true,
                                    userData: jsonData[0]
                                }
                                login(authLogin)
                                // setLocalStorage(authLogin)
                                props.history.push("/admin")

                            } else {
                                setMessage("Username or password incorrect!")
                                setIsError(true)
                                setTimeOut()
                            }

                        } else {
                            setMessage("This user not found!")
                            setIsError(true)
                            setTimeOut()
                        }

                    } else if(!ok){
                        console.log(`${status} ${statusText} this ${url}`)
                        setMessage(`${status} ${statusText}`)
                        setIsError(true)
                        setTimeOut()
                    }
                    
                } catch (err) {
                    console.log(err.message)
                    // setMessage(`Info : ${err.message}`)
                    // setIsError(true)
                    // setTimeOut()
                }
            }
        
        } else {
            setIsError(true)
            setMessage("Please enter username and password before!")
            setTimeOut()
        }
    }

    const setTimeOut = () => {
        setTimeout(() => {
            setIsError(false)
        }, 5000);
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
                    <button type="submit" className="btn btn-light mr-1"><IoLogInOutline className="ics-3" /></button>
                    <button type="button" className="btn btn-light" onClick={() => handleRegister()}><IoCreateOutline className="ics-3" /></button>
                </div>
                {isError && (
                    <div className="alert alert-danger mt-4" role="alert">
                        {message}
                    </div>
                )}
               
            </form>
        </div>
    )
}

export default Login

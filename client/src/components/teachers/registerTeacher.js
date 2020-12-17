import React, { Fragment, useState, useEffect, useContext } from 'react';
import AppContext from "../../context/appContext";
import Webconfig from "../../api/web-config";
import { 
    IoSaveOutline,
    IoCreateOutline,
    IoArrowBackOutline
 } from "react-icons/io5";

function RegisterTeacher(props) {
    const { registerStudent, genId, checkDuplicateUsername, checkDuplicateEmail } = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [msg, setMsg] = useState("")

    const handleRegister = async (e) => {
        e.preventDefault()
        let msg = "";
        const dataUsername = {
            "type":"2",
            "username":username,
        };
        const dataEmail = {
            "type":"2",
            "email":email
        };

        const resCheckUsername = await checkDuplicateUsername(dataUsername)
        // console.log(resCheckUsername)
        const resCheckEmail = await checkDuplicateEmail(dataEmail)
        // console.log(resCheckEmail)

        let _username = ""
        let _email = ""
        if(resCheckUsername !== undefined) {
            const { regist_username: username_} = resCheckUsername
            _username = username_
        }

        if(resCheckEmail !== undefined) {
            const { regist_email: email_} = resCheckEmail
            _email = email_
        }

        if(password !== confirmPassword) {
            msg = "Password not match"
            setMsg(msg)
            setIsError(true)
            setTimeoutError()

        } else if(password.length < 6){
            msg = "Password must more 6 character"
            setMsg(msg)
            setIsError(true)
            setTimeoutError()

        } else if(phone.length !== 10) {
            msg = "Phone number is 10 digit"
            setMsg(msg)
            setIsError(true)
            setTimeoutError()

        } else if(username === _username) {
            msg = "This username is duplicate"
            setMsg(msg)
            setIsError(true)
            setTimeoutError()

        } else if(email === _email) {
            msg = "This email is duplicate"
            setMsg(msg)
            setIsError(true)
            setTimeoutError()

        } else {
            console.log("Saved...")
            const id = genId()
            const data = {
                id,
                username,
                password,
                email,
                phone,
                type:"2",
                block: "0",
                status: "0"
            };
            const res = await fetch(Webconfig.registerUser(), {
                method: "POST",
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data)
            });
            // console.log(res)
            const { status, statusText, ok, url } = res
            if(ok) {
                // clearInput()
                const jsonData = await res.json()
                registerStudent(data);
                setMsg(jsonData.message)
                setIsSuccess(true)
                setTimeOutSuccess()
                props.history.push("/")

            } else if(!ok) {
                console.error(`${status} ${statusText} this ${url}`)
            }
        }
    }

    const setTimeOutSuccess = () => {
        setTimeout(() => {
            setIsSuccess(false)
        }, 5000);
    }

    const clearInput = () => {
        setUsername("")
        setPassword("")
        setConfirmPassword("")
        setEmail("")
        setPhone("")
    }

    const setTimeoutError = () => {
        setIsError(true)
        setTimeout(() => {
            setIsError(false)
        }, 5000);
    }

    return (
        <Fragment>
            <div className="w-25 mx-auto mt-3">
                <div className="mt-2 text-center"><h3>Register | Teachers</h3></div>
                <form className="mt-4 mb-5"  onSubmit={(e) => handleRegister(e)}>
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
                        <label >Password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            min="6"
                            max="15"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Confirm password</label>
                        <input 
                            type="password" 
                            className="form-control"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            min="6"
                            max="15"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Email</label>
                        <input 
                            type="email" 
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            min="6"
                            max="15"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Phone</label>
                        <input 
                            type="number" 
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-light mr-1"><IoSaveOutline className="ics-3" /></button>
                        <button type="button" className="btn btn-light" onClick={() => props.history.push("/")}><IoArrowBackOutline className="ics-3" /></button>
                    </div>
                    {isError && (
                        <div className="alert alert-danger mt-4" role="alert">
                            {msg}
                        </div>
                    )}
                    {isSuccess && (
                        <div className="alert alert-success mt-4" role="alert">
                            {msg}
                        </div>
                    )}
                </form>
            </div>
        </Fragment>
    )
}

export default RegisterTeacher

import React, { Fragment, useState, useEffect, useContext } from 'react';
import AppContext from "../../context/appContext";
import Webconfig from "../../api/web-config";

const RegisterStudent = (props) => {
    const { registerStudent, genId, checkDuplicateUsername, checkDuplicateEmail } = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [msg, setMsg] = useState("")

    // const types = [
    //     {id:"0", label:"--Select--"},
    //     {id:"1", label:"Normal"},
    //     {id:"2", label:"Special"}
    // ];

    // const levels = [
    //     {id:"0", label:"-- Select --"},
    //     {id:"1", label:"1"},
    //     {id:"2", label:"2"},
    //     {id:"3", label:"3"},
    //     {id:"4", label:"4"},
    // ];

    // useEffect(() => {
    //     // console.log(type.type)
    // }, [type])

    // useEffect(() => {
    //     // console.log(type.type)
    // }, [level])

    const handleRegister = async (e) => {
        e.preventDefault()
        let msg = "";
        const dataUsername = {
            "type":"1",
            "username":username,
        };
        const dataEmail = {
            "type":"1",
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
            // console.log("Saved...")
            const id = genId()
            const data = {
                id,
                username,
                password,
                email,
                phone,
                type:"1",
                block: "0",
                status: "0"
            };
            const res = await fetch(Webconfig.insertStudent(), {
                method: "POST",
                headers : {
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(data)
            });
            // console.log(res)
            const { status, statusText, ok, url } = res
            if(ok) {
                clearInput()
                const jsonData = await res.json()
                registerStudent(data);
                setMsg(jsonData.message)
                setIsSuccess(true)
                setTimeOutSuccess()
                // props.history.push("/")

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
                <div className="mt-2 text-center"><h3>Register | Student</h3></div>
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
                    {/* <hr /> */}
                    {/* <div className="form-group">
                        <label>Firstname</label>
                        <input 
                            type="text" 
                            className="form-control"
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Lastname</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Birthday</label>
                        <input 
                            type="date" 
                            className="form-control"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)} 
                            required
                            // value="2018-07-22"
                            // min="1850/01/01" max="2999/12/31"
                        />
                    </div>
                    <div className="form=group">
                        <level>Address</level>
                        <textarea type="text"
                            className="from-control"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Faculty</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={faculty}
                            onChange={(e) => setFaculty(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Major</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={major}
                            onChange={(e) => setMajor(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label >Level</label>
                        <select className="custom-select"
                            onChange={(e) => setLevel({ level: e.target.value })}
                        >
                        {
                            levels.map(item => 
                                <option key={item.id} value={item.id}>{item.label}</option>
                            )
                        }
                        </select>
                    </div>
                    <div className="form-group">
                        <label >Type</label>
                        <select className="custom-select"
                            onChange={(e) => setType({ type: e.target.value })}
                        >
                        {
                            types.map(item => 
                                <option key={item.id} value={item.label}>{item.label}</option>
                            )
                        }
                        </select>
                    </div> */}
                    <div className="text-center">
                        <button type="submit" className="btn btn-light mr-1">Register</button>
                        <button type="button" className="btn btn-light" onClick={() => props.history.push("/")}>Cancel</button>
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

export default RegisterStudent

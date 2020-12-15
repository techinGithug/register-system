import React, { Fragment, useContext, useEffect, useState } from 'react';
import { 
    IoPencilOutline,
    IoSaveOutline,
    IoCloseOutline,
 } from "react-icons/io5";
import AppContext from "../../context/appContext";
import Webconfig from "../../api/web-config";
import StudentHeader from "../headers/student-header";

const Student = (props) => {
    const { login, clearLocalStorage, setLocalStorage, getUserDataByUsername, genToken } = useContext(AppContext)
    const [data, setData] = useState([])
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [isError, setIsErrro] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const getStorage = JSON.parse(localStorage.getItem("user"))
        // console.log(getStorage)
        const { token, isLogin, userData } = getStorage
        if(getStorage === null) {
            props.history.push("/") 
        } else {
            setData(userData)
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        const { id } = data
        const isValid = checkData()
        if(isValid) {
            try {
                const res = await fetch(Webconfig.updateUsernameAndPasswordById(id), {
                    method: "PUT",
                    headers: {
                        "Content-Type":"application/json",
                        // "Access-Control-Allow-Origin":"*",
                    },
                    body: JSON.stringify({
                        password: newPassword
                    })
                });
                const { status, statusText, ok, url } = res
                if(ok) {
                    const jsonData = await res.json()
                    const { message } = jsonData
                    if(message !== "") {
                        setIsSuccess(true)
                        setMessage(message)
                        setTimeOutSuccess()
                    }
                    newLoad()

                } else if(!ok) {
                    console.log(`${status} ${statusText} this ${url}`)
                }
                
            } catch (err) {
                // console.log(err.message)
                // setMessage(err.message)
                // setIsErrro(true)
                // setTimeOut()
            }
            
        }
    }

    const newLoad = async () => {
        clearLocalStorage()
        const res = await getUserDataByUsername(data.regist_username)
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            if(jsonData.length > 0) {
                let token = genToken()
                const authLogin = {
                    token: token,
                    isLogin: true,
                    userData: jsonData[0]
                }
                login(authLogin)
                await setLocalStorage(authLogin)
                init()
            } else {
                console.error(`${status} ${statusText} this ${url}`)
            }

        } else {
            console.error(`${status} ${statusText} this ${url}`)
        }
        
    }

    const checkData = () => {
        const { regist_password: oldPass } = data
        let res = false
        if(oldPassword !== oldPass) {
            setMessage("Old password incorrect!")
            setIsErrro(true)
            setTimeOut()
        } else if(newPassword !== confirmPassword) {
            setMessage("Confirm password not match")
            setIsErrro(true)
            setTimeOut()
        } else {
            res = true
        }
        return res
    }

    const setTimeOut = () => {
        setTimeout(() => {
            setIsErrro(false)
        }, 5000);
    }

    const setTimeOutSuccess = () => {
        setTimeout(() => {
            setIsSuccess(false)
        }, 5000);
    }

    return (
        <Fragment>
             <div>  {/* style={{ backgroundColor: "#EAEDED" }} */}
                <StudentHeader props={props} />
            </div>
            <div className="container">
                <div className="mt-3 w-50 mx-auto">
                    <table className="table table-bordered">
                        <tbody>
                            <tr className="text-center">
                                <th width="60">Username</th>
                                <th width="60">Password</th>
                                <th>#</th>
                            </tr>
                            <tr className="text-center">
                                <td>
                                    <form>
                                        <input type="password" value={data.regist_username} readOnly />
                                    </form>
                                </td>
                                <td>
                                    <form>
                                        <input type="password" value={data.regist_password} readOnly />
                                    </form>
                                </td>
                                <td>
                                    <button 
                                        type="button" 
                                        className="btn btn-light" 
                                        data-toggle="modal" 
                                        data-target="#exampleModal">
                                        <IoPencilOutline className="ics-3" />
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                 <hr />
            </div>


            {/* Model */}
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit password</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="form align-middle" onSubmit={(e) => handleUpdate(e)}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Old password</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>New password</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Confrim password</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-light"><IoSaveOutline className="ics-3" /></button> 
                                <button type="button" className="btn btn-light" data-dismiss="modal"><IoCloseOutline className="ics-3" /></button>
                            </div>
                        </form>
                        {isError && (
                            <div className="alert alert-danger mt-2 mr-3 ml-3" role="alert">
                                {message}
                            </div>
                        )}

                        {isSuccess && (
                            <div className="alert alert-success mt-2 mr-3 ml-3" role="alert">
                                {message}
                            </div>
                        )}

                    </div>
                </div>
            </div>            
        </Fragment>
    )
}

export default Student

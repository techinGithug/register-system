import React, { Fragment, useContext, useEffect, useState } from 'react';
import { 
    IoPencilOutline,
    IoSaveOutline,
    IoCloseOutline,
    IoCreateOutline,
    IoArrowBackOutline
 } from "react-icons/io5";
import AppContext from "../../context/appContext";
import Webconfig from "../../api/web-config";
import StudentHeader from "../headers/student-header";
import AlertWarning from "../../components/alerts/alert-warning";

const Student = (props) => {
    const { login, clearLocalStorage, setLocalStorage, getUserDataByUsername, genToken, checkStudentPersonalData, checkStudentEducationData } = useContext(AppContext)
    const [data, setData] = useState([])
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [isError, setIsErrro] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [addPersonal, setAddPersonal] = useState(false)
    const [addEducation, setAddEducation] = useState(false)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const getStorage = JSON.parse(localStorage.getItem("user"))
        // console.log(getStorage)
        if(getStorage === null) {
            props.history.push("/") 
        } else {
            const { token, isLogin, userData } = getStorage
            const { regist_id: std_id } = userData
            setData(userData)

            const isHave1 = await checkStudentPersonalData(std_id)
            isHave1 ? (setAddPersonal(true)) : (setAddPersonal(false))

            const isHave2 = await checkStudentEducationData(std_id)
            isHave2 ? (setAddEducation(true)) : (setAddEducation(false))
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
             <div>
                <StudentHeader props={props} />
            </div>
            <div className="container">
                <div className="mt-3 w-50 mx-auto">
                    {addPersonal ? ("") : (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Personal data!</strong> You are not add personal data. click <IoCreateOutline className="ics-2 ml-2 mb-1" />
                        {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> */}
                    </div>
                    )}
                    
                    {addEducation ? ("") : (
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>Education data!</strong> You are not data education data. click <IoCreateOutline className="ics-2 ml-2 mb-1" />
                        {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button> */}
                    </div>
                    )}
                    <table className="table table-bordered">
                        <tbody>
                            <tr className="text-center">
                                <th>Username</th>
                                <th>Password</th>
                                <th width="60">#</th>
                            </tr>
                            <tr className="text-center">
                                <td>
                                    <form>
                                        <input type="text" className="form-control" value={data.regist_username} readOnly />
                                    </form>
                                </td>
                                <td>
                                    <form>
                                        <input type="password" className="form-control" value={data.regist_password} readOnly />
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
                                <button type="button" className="btn btn-light" data-dismiss="modal"><IoArrowBackOutline className="ics-3" /></button>
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

import React, { Fragment, useContext, useEffect, useState } from 'react'
import { IoPerson } from "react-icons/io5";
import AppContext from "../../context/appContext";
import Webconfig from "../../api/web-config";

function Teacher( props ) {
    const { authenLogin, logout } = useContext(AppContext)
    const [data, setData] = useState([])
    const [newPassword, setNewPassword] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")
    const [isError, setIsErrro] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        init()
    }, []);

    useEffect(() => {
        
    }, [data]);

    const init = async () => {
        if(authenLogin.length === 0) {
            props.history.push("/") 
        } else {
            const { id } = authenLogin.userData
            const res = await fetch(Webconfig.getTeacherById(id), {
                method: "GET"
            });
            const { status, statusText, ok, url} = res
            if(ok) {
                const jsonData = await res.json()
                if(jsonData.length > 0) {
                setData(jsonData[0])
                }
            } else if(!ok) {
                console.log(`${status} ${statusText} this ${url}`)
            }
            
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault()
        const { id } = data
        const isValid = checkData()
        if(isValid) {
            try {
                const res = await fetch(Webconfig.updateTeacherById(id), {
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
                    console.log(jsonData)
                    const { message } = jsonData
                    if(message !== "") {
                        setIsSuccess(true)
                        setMessage(message)
                        setTimeOutSuccess()
                    }
                    init()

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

    const checkData = () => {
        const { t_password: oldPass } = data
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

    const handleLogout = () => {
        logout()
        props.history.push("/")
        window.location.reload();
    }

    return (
        <Fragment>
            <div style={{ backgroundColor: "#EAEDED" }}>
                <div className="container d-flex justify-content-between">
                    <div><h2>Teacher || Register System</h2></div>
                    <div className="mt-1">
                        <button 
                            className="btn btn-light" 
                            onClick={() => handleLogout()}>Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="mt-3 w-75 mx-auto">
                    <div className="d-flex flex-row-reverse mb-2">
                        <button 
                            type="button" 
                            className="btn btn-light" 
                            data-toggle="modal" 
                            data-target="#exampleModal">
                            Edit password
                        </button>

                    </div>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th width="90">Username</th>
                                <td>
                                    <form>
                                        <input type="password" value={data.t_username} readonly />
                                    </form>
                                </td>
                                <th width="90">Password</th>
                                <td>
                                    <form>
                                        <input type="password" value={data.t_password} readonly />
                                    </form>
                                </td>
                            </tr>
                            <tr>
                                <th>Name</th>
                                <td>{data.t_firstname} {data.t_lastname}</td>
                                <th>Gender</th>
                                <td>{data.t_gender}</td>
                            </tr>
                            <tr>
                                <th>Age</th>
                                <td>{data.t_age}</td>
                                <th>Birthday</th>
                                <td>{data.t_birthday}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{data.t_phone}</td>
                                <th>Email</th>
                                <td>{data.t_email}</td>
                            </tr>
                            <tr>
                                <th>Faculty</th>
                                <td>{data.t_faculty}</td>
                                <th>Department</th>
                                <td>{data.t_department}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td colSpan="3">{data.t_address}</td>
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
                                <button type="submit" className="btn btn-light">Update</button> 
                                <button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
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

export default Teacher

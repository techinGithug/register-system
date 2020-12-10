import React, { Fragment, useContext, useEffect, useState } from 'react';
import { IoPerson } from "react-icons/io5";
import AppContext from "../../context/appContext";
import InitialState from '../../context/initialState';

const Student = (props) => {
    const { authenLogin, logout, students } = useContext(AppContext)
    const [data, setData] = useState([])
    // console.log(authenLogin)
    useEffect(() => {
        init()
    }, [])

    
    const init = async () => {
        if(authenLogin.length === 0) {
            props.history.push("/")
        } else {
            const { id } = authenLogin
            const std = await students.filter(val => {
                return id === val.id
            })
            setData(std[0])
        }
    }

    const handleEditAccount = () => {
        console.log("Edit account...")
        
    }

    const handleLogout = async () => {
        logout()
        props.history.push("/")
        window.location.reload();
    }

    return (
        <Fragment>
            <div style={{ backgroundColor: "#EAEDED" }}>
                <div className="container d-flex justify-content-between">
                    <div><h2>Student || Register System</h2></div>
                    <div className="mt-1">
                        <button 
                            className="btn btn-light" 
                            onClick={() => handleLogout()}>Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="mt-3 w-50 mx-auto">
                    <div className="d-flex flex-row-reverse mb-2">
                        <button 
                            className="btn btn-light"
                            onClick={() => handleEditAccount()}
                        >Edit account
                        </button>
                    </div>
                    <table className="table table-bordered">
                        <tbody>
                            <tr>
                                <th width="90">Name</th>
                                <td>{data.firstname}</td>
                                <th width="90">Birthday</th>
                                <td>{data.birthday}</td>
                            </tr>
                            <tr>
                                <th>Faculty</th>
                                <td>{data.faculty}</td>
                                <th>Major</th>
                                <td>{data.major}</td>
                            </tr>
                            <tr>
                                <th>Level</th>
                                <td>{data.level}</td>
                                <th>Type</th>
                                <td>{data.type}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                 <hr />
            </div>
        </Fragment>
        
    )
}

export default Student

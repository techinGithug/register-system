import React, { Fragment, useContext, useEffect } from 'react';
import { IoPerson } from "react-icons/io5";
import AppContext from "../../context/appContext";

const Student = (props) => {
    const { authenLogin, logout } = useContext(AppContext)
    useEffect(() => {
        validate()
    })

    const validate = () => {
        if(authenLogin.length === 0) {
            props.history.push("/")
        }
    }

    const handleEditAccount = () => {
        console.log("Edit account...")
    }

    const handleLogout = async () => {
        await logout()
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
                                <td>Johny Dape</td>
                                <th width="90">Birthday</th>
                                <td>1990/12/06</td>
                            </tr>
                            <tr>
                                <th>Faculty</th>
                                <td>Science and technology</td>
                                <th>Major</th>
                                <td>Computer-sceince</td>
                            </tr>
                            <tr>
                                <th>Level</th>
                                <td>3</td>
                                <th>Type</th>
                                <td>Normal</td>
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

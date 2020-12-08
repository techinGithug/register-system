import React, { useState, useEffect } from 'react';
import { IoPersonCircleOutline } from "react-icons/io5";

const Index = ( props ) => {
    const [admin, setAmin] = useState({
        username:"admin",
        password:"12345"
    });

    useEffect(() => {
        // console.log(admin.username)
    }, []);

    const handleRegister = () => {
        props.history.push("/register")
    }

    const handleLogin = () => {
        
    }

    return (
        <div className="w-25 mx-auto mt-5">
            <form className="form align-middle">
                <div className="form-group">
                    <label for="username">Username</label>
                    <input type="text" className="form-control" id="username" />
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" className="form-control" id="password" />
                </div>

                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <label className="input-group-text" for="inputGroupType">Types</label>
                    </div>
                    <select className="custom-select" id="inputGroupType">
                        {/* <option selected>Choose...</option> */}
                        <option value="student" selected>Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
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

export default Index

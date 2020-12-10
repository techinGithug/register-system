import React, { Fragment, useState, useEffect, useContext } from 'react';
import AppContext from "../../context/appContext";

const RegisterStudent = (props) => {
    const { registerStudent } = useContext(AppContext)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [birthday, setBirthday] = useState("")
    const [faculty, setFaculty] = useState("")
    const [major, setMajor] = useState("")
    const [level, setLevel] = useState("")
    const [type, setType] = useState("")

    const types = [
        {id:"0", label:"--Select--"},
        {id:"1", label:"Normal"},
        {id:"2", label:"Special"}
    ];

    const levels = [
        {id:"0", label:"-- Select --"},
        {id:"1", label:"1"},
        {id:"2", label:"2"},
        {id:"3", label:"3"},
        {id:"4", label:"4"},
    ];

    useEffect(() => {
        // console.log(type.type)
    }, [type])

    useEffect(() => {
        // console.log(type.type)
    }, [level])

    const handleRegister = () => {
        console.log(level) 
        console.log(type)
        const data ={
            username,
            password,
            firstname, 
            lastname, 
            birthday, 
            faculty, 
            major,
            level:level.level,
            type:type.type
        };
        registerStudent(data);
    }

    return (
        <Fragment>
            <div className="w-25 mx-auto">
                <div className="mt-2 text-center"><h3>Register</h3></div>
                <form className="mt-4 mb-5">
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
                            required
                        />
                    </div>
                    <hr />
                    <div className="form-group">
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
                                <option key={item.id} value={item.id}>{item.label}</option>
                            )
                        }
                            {/* <option value={type} selected>Student</option>
                            <option value={type}>Teacher</option> */}
                        </select>
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-light mr-1" onClick={() => handleRegister()}>Submit</button>
                        <button type="button" className="btn btn-light" onClick={() => props.history.push("/")}>Cancel</button>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default RegisterStudent

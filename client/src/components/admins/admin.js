import React, { Fragment, useState, useEffect, useContext } from 'react';
import { 
    IoBookOutline,
    IoPeopleOutline,
    IoPersonOutline,
    IoMailOutline
} from "react-icons/io5";
import Webconfig from "../../api/web-config";
import AppContext from "../../context/appContext";
import AdminHeader from "../headers/admin-header";

const Admin = (props) => {
    const { authenLogin } = useContext(AppContext)
    const [admins, setAdmin] = useState([])
    const [countAm, setCountAm] = useState(0)
    const [students, setStudents] = useState([])
    const [countStd, setCountStd] = useState(0)
    const [teachers, setTeachers] = useState([])
    const [countTch, setCountTch] = useState(0)
    const [subjects, setSubjects] = useState([])
    const [countSj, setCountSj] = useState(0)
    const [messages, setMessages] = useState([])
    const [countMsg, setCountMsg] = useState(0)

    useEffect(() => {
        init()
    }, []);

    // useEffect(() => {
    //     console.log(messages)
    // }, [messages])

    const init = () => {
        // if(authenLogin.length === 0) {
        const getStorage = JSON.parse(localStorage.getItem("user"))
        if(getStorage === null) {
            props.history.push("/") 
        } else {
            initAdmin()
            initStudent()
            initTeacher()
            initSubject()
            initMessage()
        }
    };


    const initAdmin = async () => {
        const res = await fetch(Webconfig.getAllAdmin(), {
            method: "GET"
        });
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            const count = jsonData.length
            if(jsonData.length > 0) {
                setCountAm(count)
                setAdmin(jsonData)
            }
        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }
    };

    const initStudent = async () => {
        const res = await fetch(Webconfig.getAllStudents(), {
            method: "GET"
        });
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            const count = jsonData.length
            if(jsonData.length > 0) {
                setCountStd(count)
                setStudents(jsonData)
            }
        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }
    };

    const initTeacher = async () => {
        const res = await fetch(Webconfig.getAllTeachers(), {
            method: "GET"
        });
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            const count = jsonData.length
            if(jsonData.length > 0) {
                setCountTch(count)
                setTeachers(jsonData)
            }
        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }
    };

    const initSubject = async () => {
        const res = await fetch(Webconfig.getAllSubjects(), {
            method: "GET"
        });
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            const count = jsonData.length
            if(jsonData.length > 0) {
                setCountSj(count)
                setSubjects(jsonData)
            }
        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }
    };

    const initMessage = async () => {
        const res = await fetch(Webconfig.getAllMessages(), {
            method: "GET"
        });
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            let count = jsonData.length
            if(jsonData.length > 0) {
                setCountMsg(count)
                setMessages(jsonData)
            }
        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }
    };

    return (
        <Fragment>
            <AdminHeader props={props} />
            <div className="container mt-5" > {/* style={{ marginTop: "15%"}} */}
                <h1 className="text-center">Admin home page</h1>
                {/* <div className="row">
                    <div className="col-3 text-center">
                        <div className=""><IoPeopleOutline className="display-3" /></div>
                        <div className="h1">{countStd}</div>
                    </div>
                    <div className="col-3 text-center">
                        <div className=""><IoPersonOutline className="display-3" /></div>
                        <div className="h1">{countTch}</div>
                    </div>
                    <div className="col-3 text-center">
                        <div className=""><IoBookOutline className="display-3" /></div>
                        <div className="h1">{countSj}</div>
                    </div>
                    <div className="col-3 text-center">
                        <div className=""><IoMailOutline className="display-3" /></div>
                        <div className="h1">{countMsg}</div>
                    </div>
                </div> */}
                {/* <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                        <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                        </tr>
                        <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                        </tr>
                    </tbody>
                </table> */}
            </div>
        </Fragment>
        
    )
}

export default Admin

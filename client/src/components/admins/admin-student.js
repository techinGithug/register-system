import React, { Fragment, useState, useEffect, useContext } from 'react';
import { 
    IoPersonAddOutline,
    IoTrashOutline,
    IoPencilOutline,
    IoLockOpenOutline,
    IoLockClosedOutline
} from "react-icons/io5";
import AdminHeader from "../headers/admin-header";
import AppContext from "../../context/appContext";
import Webconfig from "../../api/web-config";

const AdminStudent = (props) => {
    const { authenLogin } = useContext(AppContext)
    const [students, setStudents] = useState([])
    const [countStd, setCountStd] = useState(0)

    useEffect(() => {
        init()
    }, []);

    const init = () => {
        // if(authenLogin.length === 0) {
        const getStorage = JSON.parse(localStorage.getItem("user"))
        if(getStorage === null) {
            props.history.push("/") 
        } else {
            initStudent()
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

    const handleUpdate = () => {
        console.log("handleUpdate...")
    }

    const handleDelete = () => {
        if (window.confirm("Are you sure to delete this student?")) { 
            console.log("Delete...")
        } else {
            console.log("Cancel...")
        }
    }

    const handleBlock = async (id) => {
        const res = await fetch(Webconfig.blockStudent(id), {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                data: "1"
            })
        });
        // console.log(res)
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            console.log(jsonData.message)
            initStudent()
        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }

    }

    const handleUnBlock = async (id) => {
        const res = await fetch(Webconfig.unblockStudent(id), {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                data: "0"
            })
        });
        // console.log(res)
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            console.log(jsonData.message)
            initStudent()
        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }
    }

    return (
        <Fragment>
            <AdminHeader props={props} />
            <div className="container mt-4">
                <div className="d-flex flex-row-reverse">
                    <button className="btn btn-light">
                        <IoPersonAddOutline className="ics-3" />
                    </button>
                </div>
                <table className="table mt-2">
                    <thead className="text-center">
                        <tr>
                            <th scope="col" width="50">ID</th>
                            <th scope="col">NAME</th>
                            <th scope="col" width="20">AGE</th>
                            <th scope="col" width="20">GENDER</th>
                            <th scope="col" width="180"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(std => (
                                <tr key={std.id}>
                                    <td className="text-center">{std.std_id}</td>
                                    <td>{std.std_firstname} {std.std_lastname}</td>
                                    <td>{std.std_age}</td>
                                    <td className="text-center">{std.std_gender}</td>
                                    <td className="text-center">
                                        <button className="btn btn-light mr-1" onClick={() => handleUpdate()}><IoPencilOutline className="ics-3" /></button>
                                        <button className="btn btn-light mr-1" onClick={() => handleDelete()}><IoTrashOutline className="ics-3 text-danger" /></button>
                                        { 
                                            std.is_block  === "0" ? (
                                                <button className="btn btn-light" onClick={() => handleBlock(std.id)}>
                                                    <IoLockOpenOutline className="ics-3 text-success" />
                                                </button>
                                            ) : (
                                                <button className="btn btn-light" onClick={() => handleUnBlock(std.id)}>
                                                    <IoLockClosedOutline className="ics-3 text-danger"  />
                                                    </button>
                                            )
                                        }
                                        
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default AdminStudent

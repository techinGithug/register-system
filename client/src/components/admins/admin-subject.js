import React, { Fragment, useState, useEffect, useContext } from 'react';
import Webconfig from "../../api/web-config";
import AdminHeader from "../../components/headers/admin-header";
import AppContext from "../../context/appContext";
import { 
    IoTrashOutline,
    IoPencilOutline,
    IoAddOutline,
    IoSaveOutline,
    IoArrowBackOutline
} from "react-icons/io5";

const AdminSubjects = (props) => {
     const { setSubjectStorage } = useContext(AppContext)
    const [subjectLists, setSubjectLists] = useState([])
    const [teacherLists, setTeacherLists] = useState([])
    const [sjCode, setSjCode] = useState("")
    const [sjName, setSjName] = useState("")
    const [sjCrdit, setSjCredit] = useState("")
    const [sjTeacher, setSjTeacher] = useState("")
    const [isError, setIsError] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [message, setMessage] = useState("")
 
    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        const res = await fetch(Webconfig.getAllSubjects(), {
            method: "GET"
        });
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            if(jsonData.length > 0) {
                // console.log(jsonData)
                setSubjectStorage(JSON.stringify(jsonData))
                setSubjectLists(jsonData)
            } else {
                console.log(jsonData)
            }
            
        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }
    };

    const handleAddSubject = async (e) => {
        e.preventDefault()
        const data = {
            code: sjCode,
            name: sjName,
            credit: sjCrdit,
            t_id: sjTeacher
        };
        console.log(data)
        const res = await fetch(Webconfig.addSubject(data), {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        });
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            console.log(jsonData)
            const { isError, message: msg } = jsonData
            if(isError) {
                setIsError(true)
                setMessage(msg)
                setTimeOutError()
            } else {
                setIsSuccess(true)
                setMessage(msg)
                setTimeOutSuccess()
                init()
            }
            
        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }
    };
 
    const handleUpdateSubject = () => {
        console.log("Update suject...")
    };

    const handleDeleteSubject = () => {
        console.log("Delete subject...")
    };

    const handleLoadTeacher = async () => {
        const res = await fetch(Webconfig.getAllTeachers(), {
            method: "GET"
        });
        const { status, statusText, ok, url } = res
        if(ok) {
            const jsonData = await res.json()
            if(jsonData.length > 0) {
                setTeacherLists(jsonData)
            } else {
                console.log(jsonData)
            }

        } else if(!ok) {
            console.log(`${status} ${statusText} this ${url}`)
        }
    };

    const setTimeOutError = () => {
        setTimeout(() => {
            setIsError(false)
        }, 5000);
    };

    const setTimeOutSuccess = () => {
        setTimeout(() => {
            setIsSuccess(false)
        }, 5000);
    };

    return (
        <Fragment>
            <AdminHeader props={props} />
            <div className="container w-50 mt-5 mb-2 mx-auto">
                <div className="d-flex flex-row-reverse">
                    {/* <button className="btn btn-light mb-3" onClick={() => handleAddSubject()}><IoAddOutline className="ics-3" /></button> */}
                    <button 
                        type="button" 
                        className="btn btn-light mb-3" 
                        data-toggle="modal" 
                        data-target="#exampleModal">
                        <IoAddOutline className="ics-3"
                        onClick={() => handleLoadTeacher()}
                     />
                    </button>
                </div>
                <table className="table">
                    <thead className="text-center">
                        <tr>
                            <th scope="col" width="120">CODE</th>
                            <th scope="col">SUBJECT</th>
                            <th scope="col" width="50">CREDIT</th>
                            <th scope="col">TEACHER</th>
                            <th width="150"></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        subjectLists.map(item => (
                            <tr key={item.id}>
                                <td>{item.sj_code}</td>
                                <td>{item.sj_name}</td>
                                <td className="text-center">{item.sj_credit}</td>
                                <td>{item.t_firstname} {item.t_lastname}</td>
                                <td className="text-center">
                                    <button className="btn btn-light mr-1"><IoPencilOutline className="ics-3" /></button>
                                    <button className="btn btn-light"><IoTrashOutline className="ics-3 text-danger" /></button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>


            {/* Model */}
            <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit subject</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="form align-middle" onSubmit={(e) => handleAddSubject(e)}>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label>Code</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={sjCode}
                                        onChange={(e) => setSjCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Subject</label>
                                    <input 
                                        type="text" 
                                        className="form-control"
                                        value={sjName}
                                        onChange={(e) => setSjName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Credit</label>
                                    <input 
                                        type="number" 
                                        className="form-control"
                                        value={sjCrdit}
                                        onChange={(e) => setSjCredit(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                <label>Teacher</label>
                                <select className="custom-select"
                                    value={sjTeacher}
                                    onChange={(e) => setSjTeacher(e.target.value)}
                                    >
                                    {
                                        teacherLists.map(item => 
                                            <option key={item.id} value={item.t_id}>{item.t_firstname} {item.t_lastname}</option>
                                        )
                                    }
                                </select>
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

export default AdminSubjects

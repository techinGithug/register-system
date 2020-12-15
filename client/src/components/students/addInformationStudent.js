import React, { Fragment, useEffect, useState, useContext } from 'react';
import { 
    IoPencilOutline,
    IoSaveOutline,
    IoCloseOutline,
    IoArrowBackOutline
 } from "react-icons/io5";
import AppContext from "../../context/appContext";
import StudentHeader from "../headers/student-header";

const AddInformationStudent = (props) => {
    const { genId } = useContext(AppContext)
    const [stdId, setStdId] = useState("")
    const [stdFirstname, setStdFirstname] = useState("")
    const [stdLastname, setStdLastname] = useState("")
    const [stdAge, setStdAge] = useState("")
    const [stdGender, setStdGender] = useState("")
    const [stdBirthday, setStdBirthdary] = useState("")

    const genders = [
        {id:"1", label:"Male"},
        {id:"2", label:"Female"}
    ];
    

    return (
        <Fragment>
             <div>
                <StudentHeader props={props} />
            </div>
            <div className="container mt-4 mb-5 w-25">
                <h5 className="text-center mb-3">Personal data</h5>
                <form onSubmit={(e) => console.log("Submit...")}>
                    <div className="form-group">
                        <label>Auto id</label>
                        <input type="text" className="form-control" value={genId()} readOnly />
                    </div>
                    <div className="form-group">
                        <label>Firstname</label>
                        <input type="text" className="form-control" value={(e) => setStdFirstname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Lastname</label>
                        <input type="text" className="form-control" value={(e) => setStdLastname(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input type="text" className="form-control" value={(e) => setStdAge(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select className="custom-select"
                            onChange={(e) => setStdGender({ stdGender: e.target.value })}
                            >
                            {
                                genders.map(item => 
                                    <option key={item.id} value={item.label}>{item.label}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Birthday</label>
                        <input type="date" className="form-control" value={(e) => setStdBirthdary(e.target.value)} />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-light mr-1"><IoSaveOutline className="ics-3" /></button>
                        <button type="button" className="btn btn-light" onClick={() => props.history.push("/student")}><IoArrowBackOutline className="ics-3" /></button>
                    </div>
                </form>
            </div>
        </Fragment>
       
    )
}

export default AddInformationStudent

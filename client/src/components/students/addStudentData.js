import React, { Fragment, useEffect, useState, useContext } from 'react';
import { 
    IoPencilOutline,
    IoSaveOutline,
    IoCloseOutline,
    IoArrowBackOutline,
    IoCheckmarkOutline
 } from "react-icons/io5";
import AppContext from "../../context/appContext";
import StudentHeader from "../headers/student-header";

const AddStudentData = (props) => {
    const { getUser, addStudentPersonalData, addStudentEducationData, checkStudentPersonalData, checkStudentEducationData } = useContext(AppContext)
    // const [id, setId] = useState("")
    // const [stdId, setStdId] = useState("")
    const [stdFirstname, setStdFirstname] = useState("")
    const [stdLastname, setStdLastname] = useState("")
    const [stdAge, setStdAge] = useState("")
    const [stdGender, setStdGender] = useState("Male")
    const [stdBirthday, setStdBirthdary] = useState("")
    const [stdAddress, setStdAddress] = useState("")
    const [stdZipcode, setStdZipcode] = useState("")
    const [message, setMessage] = useState("")
    const [addPersonal, setAddPersonal] = useState(false)
    const [stdFaculty, setStdFaculty] = useState("")
    const [stdMajor, setStdMajor] = useState("")
    const [stdLevel, setStdLevel] = useState("One")
    const [stdType, setStdType] = useState("Normal")
    const [addEducation, setAddEducation] = useState(false)
    const [isError, setIsErrro] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

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

            const isHave1 = await checkStudentPersonalData(std_id)
            isHave1 ? (setAddPersonal(true)) : (setAddPersonal(false))

            const isHave2 = await checkStudentEducationData(std_id)
            isHave2 ? (setAddEducation(true)) : (setAddEducation(false))
        }
    };

    const genders = [
        {id:"1", label:"Male"},
        {id:"2", label:"Female"}
    ];

    const types = [
        {id:"1", label:"Normal"},
        {id:"2", label:"Special"}
    ];

    const levels = [
        {id:"1", label:"One"},
        {id:"2", label:"Two"},
        {id:"3", label:"Three"},
        {id:"4", label:"Four"}
    ]
    
    const handleAddPersonalData = e => {
        e.preventDefault()
        const { id, regist_id: std_id } = getUser().userData
        const isValid = checkData()
        if(isValid) {
            const data = {
                std_id,
                firstname: stdFirstname,
                lastname: stdLastname,
                age: stdAge,
                gender: stdGender,
                birthday: stdBirthday,
                address: stdAddress,
                zipcode: stdZipcode
            };

            const { isError, message: msg} = addStudentPersonalData(data)
            console.log(isError+" "+msg)
            if(isError) {
                setMessage("Add student personal data uncomplete!")
                setIsSuccess(true)
                setTimeOutSuccess()
            } else if(!isError){
                // setMessage(msg)
                // setIsSuccess(true)
                // setTimeOutSuccess()
                setAddPersonal(true)
                init()
            }
        }
    };

    const handleAddEducationData = async (e) => {
        e.preventDefault()
        const { id, regist_id: std_id } = getUser().userData
        const data ={
            std_id,
            faculty: stdFaculty,
            major: stdMajor,
            level: stdLevel,
            type: stdType
        };
        const { isError, message: msg } = addStudentEducationData(data)
        console.log(isError+" "+msg)
        if(isError) {
            setMessage("Add student education uncomplete!")
            setIsSuccess(true)
            setTimeOutSuccess()
        } else if(!isError){
            // setMessage(msg)
            // setIsSuccess(true)
            // setTimeOutSuccess()
            setAddEducation(true)
            init()
        }
        
    };

    const checkData = () => {
        return true
    };

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
            <div className="container mt-4 mb-5 w-50">
                <div className="row">
                    <div className="col-sm">
                        <h5 className="text-center mb-3">Personal data</h5>
                        <form onSubmit={(e) => handleAddPersonalData(e)}>
                            <div className="form-group">
                                <label>Firstname</label>
                                <input type="text" className="form-control" value={stdFirstname} onChange={(e) => setStdFirstname(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Lastname</label>
                                <input type="text" className="form-control" value={stdLastname} onChange={(e) => setStdLastname(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input type="number" max="200" className="form-control" value={stdAge} onChange={(e) => setStdAge(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <select className="custom-select"
                                    value={stdGender}
                                    onChange={(e) => setStdGender(e.target.value)}
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
                                <input type="date" className="form-control" value={stdBirthday} onChange={(e) => setStdBirthdary(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input type="text" className="form-control" value={stdAddress} onChange={(e) => setStdAddress(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Zipcode</label>
                                <input type="number" className="form-control" value={stdZipcode} onChange={(e) => setStdZipcode(e.target.value)} required />
                            </div>
                            <div className="text-center">
                                {addPersonal ? (
                                    <button type="submit" className="btn btn-light mr-1" disabled><IoCheckmarkOutline className="ics-3" /></button>
                                ):(
                                    <button type="submit" className="btn btn-light mr-1"><IoSaveOutline className="ics-3" /></button>
                                )}
                                
                                {/* <button type="button" className="btn btn-light" onClick={() => props.history.push("/student")}><IoArrowBackOutline className="ics-3" /></button> */}
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

                    <div className="col-sm">
                        <h5 className="text-center mb-3">Education data</h5>
                        <form onSubmit={(e) => handleAddEducationData(e)}>
                            <div className="form-group">
                                <label>Faculty</label>
                                <input type="text" className="form-control" value={stdFaculty} onChange={(e) => setStdFaculty(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Major</label>
                                <input type="text" className="form-control" value={stdMajor} onChange={(e) => setStdMajor(e.target.value)} required />
                            </div>
                            <div className="form-group">
                                <label>Level</label>
                                <select className="custom-select"
                                    value={stdLevel}
                                    onChange={(e) => setStdLevel(e.target.value)}
                                    >
                                    {
                                        levels.map(item => 
                                            <option key={item.id} value={item.id}>{item.label}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Type</label>
                                <select className="custom-select"
                                    value={stdType}
                                    onChange={(e) => setStdType(e.target.value)}
                                    >
                                    {
                                        types.map(item => 
                                            <option key={item.id} value={item.label}>{item.label}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="text-center">
                                {addEducation ? (
                                    <button type="submit" className="btn btn-light mr-1" disabled><IoCheckmarkOutline className="ics-3" /></button>
                                ):(
                                    <button type="submit" className="btn btn-light mr-1"><IoSaveOutline className="ics-3" /></button>
                                )}
                                
                                {/* <button type="button" className="btn btn-light" onClick={() => props.history.push("/student")}><IoArrowBackOutline className="ics-3" /></button> */}
                            </div>
                        </form>
                    </div>
                </div>
                
            </div>
        </Fragment>
       
    )
}

export default AddStudentData

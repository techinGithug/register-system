import React, { Fragment, useState, useEffect, useContext } from 'react';
import AppContext from "../../context/appContext";
import StudentHeader from "../headers/student-header";

const StudentProfile = (props) => {
    const { getUser, getStudentByStudentId } = useContext(AppContext)
    const [loginData, setLoginData] = useState()
    const [data, setData] = useState([])

    useEffect(() => {
        init()
    }, []);

    const init = async () => {
        const getStorage = getUser()
        if(getStorage === null) {
            props.history.push("/") 
        } else {
            const { token, isLogin, userData } = getStorage
            const { regist_id: std_id } = userData
            setLoginData(userData)
            const data_ = await getStudentByStudentId(std_id)
            setData(data_)
        }
    };

    // const personalData = async () => {
    //     // console.log(data[0])
    //     const { std_firstname: firstname, std_lastname: lastname, std_age: age, std_gender: gender, std_birthday: birthday, user_address: address, zipcode } = data[0]
    //     return (
    //         <div>
    //             <ul className="list-group">
    //                 <li className="list-group-item text-center bg-light"><strong>Personal Data</strong></li>
    //                 <li className="list-group-item"><strong>Name</strong> {firstname} {lastname}</li>
    //                 <li className="list-group-item"><strong>Gender</strong> {gender}</li>
    //                 <li className="list-group-item"><strong>Age</strong> {age}</li>
    //                 <li className="list-group-item"><strong>Birthday</strong> {birthday}</li>
    //                 <li className="list-group-item"><strong>Address</strong> {address}</li>
    //                 <li className="list-group-item"><strong>Address</strong> {zipcode}</li>
    //             </ul>
    //             {/* list-group-horizontal-md */}
    //         </div>
    //     )
    // };

    // const educationData = () => {
    //     const { std_faculty: faculty, std_major: major, std_level: level, std_type: type, t_name, t_lastname } = data[0]
    //     return (
    //         <div>
    //             <ul className="list-group">
    //                 <li className="list-group-item text-center bg-light"><strong>Education Data</strong></li>
    //                 <li className="list-group-item"><strong>Faculty</strong> {t_name} {t_lastname}</li>
    //                 <li className="list-group-item"><strong>Major</strong> {major}</li>
    //                 <li className="list-group-item"><strong>Level</strong> {level}</li>
    //                 <li className="list-group-item"><strong>Type</strong> {type}</li>
    //                 <li className="list-group-item"><strong>Advisor t.</strong> {t_name} {t_lastname}</li>
    //                 <li className="list-group-item">.</li>
    //             </ul>
    //         </div>
    //     )
    // }

    return (
        <Fragment>
            <StudentHeader props={props} />
            <div className="container w-50 mt-4 mb-4">
                <div className="row">
                    <div className="col-sm">
                        <ul className="list-group">
                            {
                                console.log(data[0])
                            }
                            {/* <li className="list-group-item text-center bg-light"><strong>Personal Data</strong></li> */}
                            {/* <li className="list-group-item"><strong>Name</strong> {data[0].std_firstname} {data[0].std_lastname}</li> */}
                            {/* <li className="list-group-item"><strong>Gender</strong> {gender}</li>
                            <li className="list-group-item"><strong>Age</strong> {age}</li>
                            <li className="list-group-item"><strong>Birthday</strong> {birthday}</li>
                            <li className="list-group-item"><strong>Address</strong> {address}</li>
                            <li className="list-group-item"><strong>Address</strong> {zipcode}</li> */}
                        </ul>
                    </div>
                    <div className="col-sm">
                        {/* {educationData()} */}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StudentProfile

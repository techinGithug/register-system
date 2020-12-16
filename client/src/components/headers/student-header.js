import React, { Fragment, useContext, useEffect } from 'react';
import AppContext from "../../context/appContext";
import {
    NavLink
} from "react-router-dom";
import { 
    IoLogOutOutline, 
    IoHomeOutline,
    IoBookOutline,
    IoPeopleOutline,
    IoSettingsOutline,
    IoPersonOutline,
    IoMailOutline,
    IoMailUnreadOutline,
    IoPerson,
    IoCreateOutline
} from "react-icons/io5";

const StudentHeader = ({ props} ) => {
    const { logout } = useContext(AppContext)

    useEffect(() => {
        init()
    }, [])

    const init = async () => {
        const getStorage = JSON.parse(localStorage.getItem("user"))
        // console.log(getStorage)
        if(getStorage === null) {
            props.history.push("/") 
        }
    };

    const handleLogout = () => {
        logout()
        props.history.push("/")
        window.location.reload();
    }

    return (
        <Fragment>
            <div style={{ backgroundColor: "#EAEDED", padding: 5 }}>
                <div className="container d-flex">
                    <div className="mr-auto bd-highlight">
                        <span className="m-1"><IoPerson className="ics-5" /></span> |
                        <NavLink to="/student" className="m-1 hover-grey mr-3">
                            <IoHomeOutline className="ics-5" />
                        </NavLink> 
                    </div>
                    
                    {/* <NavLink to="/admin-student" className="m-1 hover-grey mr-3"><IoPeopleOutline className="ics-5" /></NavLink>*/}
                    <NavLink to="/student-profile" className="m-1 hover-grey mr-3"><IoPersonOutline className="ics-5" /></NavLink> 
                    <NavLink to="/student-addData" className="m-1 hover-grey mr-3"><IoCreateOutline className="ics-5" /></NavLink>                    
                    <NavLink to="#" className="m-1 hover-grey mr-3"><IoSettingsOutline className="ics-5" /></NavLink>
                    <NavLink to="#" className="m-1 hover-grey mr-3"><IoMailUnreadOutline className="ics-5" /></NavLink>
                    <div className="m-1 ml-4" >
                        <div 
                            className="hover-grey" 
                            onClick={() => handleLogout()}
                        >
                            <IoLogOutOutline className="ics-5" />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StudentHeader

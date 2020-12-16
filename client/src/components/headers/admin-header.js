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
    IoLogoAngular
} from "react-icons/io5";

const AdminHeader = ({ props} ) => {
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
                        <span className="m-1"><IoLogoAngular className="ics-5" /></span> |
                        <NavLink to="/admin" className="m-1 hover-grey mr-3">
                            <IoHomeOutline className="ics-5" />
                        </NavLink> 
                    </div>
                    
                    <NavLink to="/admin-student" className="m-1 hover-grey mr-3"><IoPeopleOutline className="ics-5" /></NavLink>
                    <NavLink to="#" className="m-1 hover-grey mr-3"><IoPersonOutline className="ics-5" /></NavLink>
                    <NavLink to="#" className="m-1 hover-grey mr-3"><IoBookOutline className="ics-5" /></NavLink>
                    <NavLink to="#" className="m-1 hover-grey mr-3"><IoSettingsOutline className="ics-5" /></NavLink>
                    <NavLink to="#" className="m-1 hover-grey mr-3"><IoMailUnreadOutline className="ics-5" /></NavLink>
                    <div className="mt-1 ml-4" >
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

export default AdminHeader

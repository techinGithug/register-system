import React, { useReducer } from "react";
import AppContext from "../context/appContext";
import AppReducer from "../context/appReducer";
import InitialState from "../context/initialState";
import Webconfig from "../api/web-config";
import { 
    ADD_STUDENT, 
    ADD_TEACHER,
    AUTHEN_LOGIN,
    DELETE_STUDENT, 
    DELETE_TEACHER,
    LOGOUT,
    REGISTER_STUDENT,
    UPDATE_STUDENT, 
    UPDATE_TEACHER
} from "../context/appAction";

 const setLocalStorage = (data) => {
    localStorage.setItem("user", JSON.stringify(data))
}

const AppState = (props) => {
    const [state, dispatch] = useReducer(AppReducer, InitialState)
    // Add student

    // Update student

    // Delete student

    // Authen login
    const login = (authLogin) => {
        setLocalStorage(authLogin)
        dispatch({
            type: AUTHEN_LOGIN,
            payload: authLogin
        })
    };

    const registerStudent = async (data) => {
        dispatch({
            type: REGISTER_STUDENT,
            payload: data
        })
    };

    // Logout
    const logout = () => {
        clearLocalStorage()
        dispatch({
            type: LOGOUT
        })
    };

    const setLocalStorage = (data) => {
        localStorage.setItem("user", JSON.stringify(data))
    }

    const clearLocalStorage = () => {
        localStorage.removeItem("user")
    }

    return (
        <AppContext.Provider value={{
            // Sate
            authenLogin: state.authenLogin,
            admins: state.admins,
            register: state.register,
            students: state.students,
            teachers: state.teachers,
            userData: state.userData,
            
            // Action
            login,
            registerStudent,
            logout
            
        }}
        >
            {props.children}
        </AppContext.Provider>
    );

}

export default AppState;
import React, { useReducer } from "react";
import AppContext from "../context/appContext";
import AppReducer from "../context/appReducer";
import InitialState from "../context/initialState";
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

const AppState = (props) => {
    const [state, dispatch] = useReducer(AppReducer, InitialState)
    // Add student

    // Update student

    // Delete student

    // Authen login
    const login = (authLogin) => {
        authLogin.isLogin && (
            dispatch({
                type: AUTHEN_LOGIN,
                payload: authLogin
            })
        )
    };

    const registerStudent = (data) => {
        dispatch({
            type: REGISTER_STUDENT,
            payload: data
        })
    };

    // Logout
    const logout = () => {
        dispatch({
            type: LOGOUT
        })
    };

    return (
        <AppContext.Provider value={{
            // Sate
            authenLogin: state.authenLogin,
            admins: state.admins,
            register: state.register,
            students: state.students,
            teachers: state.teachers,
            // types: state.types,
            
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
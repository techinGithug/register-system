import React, { useReducer } from "react";
import AppContext from "../context/appContext";
import AppReducer from "../context/appReducer";
import InitialState from "../context/initialState";
import { 
    AUTHEN_LOGIN,
    ADD_STUDENT, 
    UPDATE_STUDENT, 
    DELETE_STUDENT, 
    ADD_TEACHER,
    UPDATE_TEACHER,
    DELETE_TEACHER,
    LOGOUT
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
            response: state.response,
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
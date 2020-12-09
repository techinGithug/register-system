import React, { useReducer } from "react";
import AppContext from "../context/appContext";
import appReducer from "../context/appReducer";
import InitialState from "../context/initialState";
import { 
    AUTHEN_LOGIN,
    ADD_STUDENT, 
    UPDATE_STUDENT, 
    DELETE_STUDENT, 
    ADD_TEACHER,
    UPDATE_TEACHER,
    DELETE_TEACHER
} from "../context/appAction";

const AppState = (props) => {
    const [state, dispatch] = useReducer(appReducer, InitialState)
    // Add student

    // Update student

    // Delete student

    // Authen login
    const login = (authLogin) => {
        authLogin.login && (
            dispatch({
                type: AUTHEN_LOGIN,
                payload: authLogin
            })
        )
    }

    return (
        <AppContext.Provider value={{
            // Sate
            authenLogin: state.authenLogin,
            admins: state.admins,
            response: state.response,
            students: state.students,
            teachers: state.teachers,
            types: state.types,
            
            // Action
            login
            
        }}
        >
            {props.children}
        </AppContext.Provider>
    );

}

export default AppState;
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
};

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

    

    const checkDuplicateUsername = async (data) => {
        const { type, username } = data
        if(type === "1") {
            const res = await fetch(Webconfig.checkDuplicateUsername(username), {
                method: "GET"
            });
            const { status, statusText, ok, url } = res
            if(ok) {
                const jsonData = await res.json()
                if(jsonData.length > 0) {
                    return jsonData[0]
                } else {
                    return jsonData[0]
                }
                
            } else if(!ok) {
                console.error(`${status} ${statusText} this ${url}`)
            }

        } else if(type === "2") {
            return "Teacher"
        } else if(type === "3") {
            return "Amdin"
        }
    };

    const checkDuplicateEmail = async (data) => {
        const { type, email } = data
        if(type === "1") {
            const res = await fetch(Webconfig.checkDuplicateEmail(email), {
                method: "GET"
            });
            const { status, statusText, ok, url } = res
            if(ok) {
                const jsonData = await res.json()
                if(jsonData.length > 0) {
                    return jsonData[0]
                } else {
                    return jsonData[0]
                }
                
            } else if(!ok) {
                console.error(`${status} ${statusText} this ${url}`)
            }

        } else if(type === "2") {
            return "Teacher"
        } else if(type === "3") {
            return "Amdin"
        }
    };

    const getUserDataByUsername = async (username) => {
        const res = await fetch(Webconfig.getUserDataByUsername(username), {
            method:"GET"
        });
        return res
    };

    const setLocalStorage = (data) => {
        localStorage.setItem("user", JSON.stringify(data))
    };

    const clearLocalStorage = () => {
        localStorage.removeItem("user")
    };

    const genId = () => {
        const date = new Date()
        return (`${date.getFullYear()}${(date.getMonth()+1)}${date.getDate()}${date.getHours()}${date.getMinutes()}${date.getSeconds()}${date.getMilliseconds()}`)
    };

    const genToken = () => {
        let pass = ""; 
        let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +  
                'abcdefghijklmnopqrstuvwxyz0123456789@#$'; 
          
        for (let i = 1; i <= 15; i++) { 
            var char = Math.floor(Math.random() * str.length + 1); 
            pass += str.charAt(char) 
        } 
        return pass
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
            checkDuplicateUsername,
            checkDuplicateEmail,
            clearLocalStorage,
            genId,
            genToken,
            getUserDataByUsername,
            login,
            logout,
            registerStudent,
            setLocalStorage
            
        }}
        >
            {props.children}
        </AppContext.Provider>
    );

}

export default AppState;
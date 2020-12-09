import { act } from "react-dom/test-utils";
import { 
    ADD_STUDENT, 
    UPDATE_STUDENT, 
    DELETE_STUDENT,
    ADD_TEACHER, 
    UPDATE_TEACHER,
    DELETE_TEACHER,
    LOGIN,
    LOGOUT,
    REGISTER,
    AUTHEN_LOGIN
 } from "../context/appAction";
 import appContext from "../context/appContext";

 const appReducer = (state, action) => {
    //  console.log(action)
    switch(action.type) {
        case AUTHEN_LOGIN :
            return {
                ...state,
                authenLogin: {token: action.payload.token, login: action.payload.login}
            };
        
        case ADD_STUDENT :
            return {

            };

        case UPDATE_STUDENT :
            return {

            };

        case DELETE_STUDENT :
            return {

            };

        case ADD_TEACHER :
            return {

            };

        case UPDATE_TEACHER :
            return {

            };

        case DELETE_TEACHER :
            return {

            };

        case LOGIN:
            return{

            };

        case LOGOUT: 
            return {

            };

        case REGISTER:
            return {

            };

        default :
            return state;
    }
 }

 export default appReducer;
import React from "react";

const InitialState = {
    authenLogin:[],
    admins:[
        { 
            id:1,
            username:"admin1",
            password:"admin1",
            firstname:"admin1",
            lastname:"admin1"
        },
        {
            id:2,
            username:"admin2",
            password:"admin2",
            firstname:"admin2",
            lastname:"admin2"
        }
    ],
    register:[
        
    ],
    students:[
        {
            id:"1", 
            username:"techin", 
            password:"999999", 
            firstname:"techin", 
            lastname:"nakata", 
            birthday:"1999-12-05", 
            faculty:"Science-technology",
            major:"Computer-science",
            level:"1",
            type:"Normal"
        },
        {
            id:"2", 
            username:"john", 
            password:"999999", 
            firstname:"John", 
            lastname:"Doe", 
            birthday:"1996-11-05", 
            faculty:"Science-technology",
            major:"Computer-science",
            level:"2",
            type:"Normal"
        },
        {
            id:"3", 
            username:"johny", 
            password:"999999", 
            firstname:"Johny", 
            lastname:"Dape", 
            birthday:"1991-01-05", 
            faculty:"Science-technology",
            major:"Information technology",
            level:"3",
            type:"Normal"
        },
    ],
    teachers:[],

    // Type for login
    // types:[
    //     {id:"1", label:"Student"},
    //     {id:"2", label:"Teacher"}
    //     // {id:"3", label:"Admin"}
    // ],
    // response:[
    //     {   
    //         id:1,
    //         username:"test1",
    //         password:"1234"
    //     },
    //     {   
    //         id:2,
    //         username:"test2",
    //         password:"1234"
    //     }
    // ];
    userData: []
};

export default InitialState;
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
    register:[],
    students:[],
    teachers:[],

    // Type for login
    // types:[
    //     {id:"1", label:"Student"},
    //     {id:"2", label:"Teacher"}
    //     // {id:"3", label:"Admin"}
    // ],
    response:[
        {   
            id:1,
            username:"test1",
            password:"1234"
        },
        {   
            id:2,
            username:"test2",
            password:"1234"
        }
    ]
};

export default InitialState;
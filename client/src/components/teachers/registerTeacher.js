import React from 'react'

function RegisterTeacher(props) {
    return (
        <div>
            <h3>Register Teacher...</h3>
            <button className="btn btn-light" onClick={() => props.history.push("/")}>Back</button>
        </div>
    )
}

export default RegisterTeacher

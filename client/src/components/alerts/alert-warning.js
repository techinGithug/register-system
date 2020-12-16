import React, { Fragment } from 'react'

const AlertWarning = ({ topic, detail }) => {
    return (
        <Fragment>
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>{topic}</strong>{detail}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        </Fragment>
    )
}

export default AlertWarning

import React, { Fragment, useState, useEffect, useContext } from 'react';
import AppContext from "../../context/appContext";
import StudentHeader from "../headers/student-header";
import Webconfig from "../../api/web-config";
import ImgProfile from "../../assets/images/img1.png";

const StudentProfile = (props) => {
    const { getUser } = useContext(AppContext)
    const [loginData, setLoginData] = useState()
    const [data, setData] = useState([])
    const [image, setImage] = useState()

    useEffect(() => {
        init()
    }, []);

    // useEffect(() => {
    //     console.log(image)
    // }, [image]);

    const init = async () => {
        const getStorage = getUser()
        if(getStorage === null) {
            props.history.push("/") 
        } else {
            setImage(ImgProfile)

            const { token, isLogin, userData } = getStorage
            const { regist_id: std_id } = userData
            setLoginData(userData)

            const res = await fetch(Webconfig.getStudentByStudentId(std_id), {
                method: "GET"
            });
            const { status, statusText, ok, url } = res
            if(ok) {
                const jsonData = await res.json()
                if(jsonData.length > 0) {
                    setData(jsonData[0])
                } else {
                    console.log(jsonData)
                }
    
            } else if(!ok) {
                console.error(`${status} ${statusText} this ${url}`)
            }
            
        }
    };

    const uploadImg = e => {
        e.preventDefault()
        console.log("Update image...")
    };

    const onImageChange = e => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setImage(URL.createObjectURL(img))
        }
      };

    return (
        <Fragment>
            <StudentHeader props={props} />
            <div className="w-10pc mx-auto mt-5 mb-5">
                {/* <img className="rounded-circle" src={ImgProfile} alt="" /> */}
                <img className="rounded-circle" src={image} alt="" />
            </div>
            {/* <div className="w-10pc mx-auto">
                <form onSubmit={(e) => uploadImg(e)}>
                    <div className="form-group text-center">
                        <input type="file" className="form-control-file" onChange={onImageChange} />
                        <button type="submit" className="btn btn-light my-2">Upload</button>
                    </div>
                    <button type="submit" className="btn btn-light">Upload</button>
                </form>
                
            </div> */}
            <div className="container w-50 mt-4 mb-4">
                <div className="row">
                    <div className="col-sm">
                        <ul className="list-group">
                            <li className="list-group-item text-center bg-light"><strong>Personal Data</strong></li>
                            <li className="list-group-item"><strong>Name</strong> {data.std_firstname} {data.std_lastname}</li>
                            <li className="list-group-item"><strong>Gender</strong> {data.std_gender}</li>
                            <li className="list-group-item"><strong>Age</strong> {data.std_age}</li>
                            <li className="list-group-item"><strong>Birthday</strong> {data.std_birthday}</li>
                            <li className="list-group-item"><strong>Address</strong> {data.user_address}</li>
                            <li className="list-group-item"><strong>Zipcode</strong> {data.zipcode}</li>
                        </ul>
                    </div>
                    <div className="col-sm">
                        <ul className="list-group">
                            <li className="list-group-item text-center bg-light"><strong>Education Data</strong></li>
                            <li className="list-group-item"><strong>Faculty</strong> {data.std_faculty}</li>
                            <li className="list-group-item"><strong>Major</strong> {data.std_major}</li>
                            <li className="list-group-item"><strong>Level</strong> {data.std_level}</li>
                            <li className="list-group-item"><strong>Type</strong> {data.std_type}</li>
                            <li className="list-group-item"><strong>Advisor t.</strong> {data.t_name} {data.t_lastname}</li>
                            <li className="list-group-item">.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default StudentProfile

import React, { useContext } from "react"
import { Layout } from '../../Components/Layout/Layout';
import { Title } from '../../Components/Title/Title';
import { MoviesContext } from "../../context/MoviesContext";
import { ValidateSession } from "../../Components/ValidateSession/ValidateSession";
import './UserProfile.css';

function UserProfile()
{
    const {logged, userInfo} = useContext(MoviesContext)

    if(!logged){ return <ValidateSession />}
console.log(userInfo)
    return(
        <Layout>
            <Title text={userInfo.Name + ' profile!'} />
            <div className="user-container">
                <div className="user-container-row1-1">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" className="user-profile-image" />
                </div>
                <div className="user-container-row1-2">
                    <div className="user-group-info-main">
                        <h5>Full name:</h5>
                        <p>{userInfo.Name} {userInfo.Last_name} {userInfo.Last_name2}</p>
                    </div>
                    <div className="user-group-info-main">
                        <h5>Email:</h5>
                        <p>{userInfo.Email}</p>
                    </div>
                </div>
                <div className="user-container-row1-3">
                    <div className="user-group-info-main">
                        <h5>Username:</h5>
                        <p>{userInfo.Username}</p>
                    </div>
                    <div className="user-group-info-main">
                        <h5>Birthday:</h5>
                        <p>{userInfo.Birthday}</p>
                    </div>
                </div>
                <div className="user-container-row2-2">
                    <div className="user-group-info-main">
                        <h5>ID Gender:</h5>
                        <p>{userInfo.IdGender}</p>
                    </div>
                    <div className="user-group-info-main">
                        <h5>Gender:</h5>
                        <p>{userInfo.Gender_Name}</p>
                    </div>
                </div>
                <div className="user-container-row2-1">
                    <div className="user-group-info-ID">
                        <h5>User ID:</h5>
                        <p>{userInfo.id}</p>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export { UserProfile }
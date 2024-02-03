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

    return(
        <Layout>
            <Title text='User profile!' />
            <div className="user-container">

            </div>
        </Layout>
    )
}

export { UserProfile }
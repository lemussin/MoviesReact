import React, { useContext } from "react";
import { Layout } from "../../Components/Layout/Layout";
import { Title } from "../../Components/Title/Title";
import './SignOff.css';
import { useNavigate } from "react-router-dom";
import { MoviesContext } from "../../context/MoviesContext";

function SignOff()
{
    const navigate = useNavigate();
    const {closeSession} = useContext(MoviesContext)

    const signOffSession = () =>{
        closeSession();
        navigate('/');
    }

    const continueSession = () =>{
        navigate(-1);
    }

    return(
        <Layout>
            <Title text='Do you want to close your session?'/>
            <div className="container-signoff">
                <button className="btn-signoff accept" onClick={signOffSession}><i class="bi bi-door-closed-fill"></i> Sign Off</button>
                <button className="btn-signoff decline" onClick={continueSession}><i class="bi bi-box-arrow-in-right"></i> Cancel, come back</button>
            </div>
        </Layout>
    )
}

export { SignOff }
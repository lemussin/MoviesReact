import React from "react";
import './BackButton.css';
import { useNavigate } from "react-router-dom";

function BackButton()
{
    const navigate = useNavigate()

    const onHandleClick = () =>{
        navigate(-1)
    }

    return(
        <button className="btn-backbtn" onClick={onHandleClick}>Back</button>
    )
}

export { BackButton }
import React from "react";
import './AddButton.css'
import { useNavigate } from "react-router-dom";

function AddButton({linkRef})
{
    const navigate = useNavigate();

    const onHandleNavigate = () =>{
        navigate(linkRef)
    }


    return(
        <button className="btn-add-fixed"
            onClick={onHandleNavigate}
        >
            <i className="bi bi-plus-circle"></i>
        </button>
    )
}

export { AddButton }
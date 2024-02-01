import React from "react";
import './Title.css';

function Title({text}){

    return(
        <div className="container__title">
            <h3 className="title">{text}</h3>
            <hr />
        </div>
    )

}

export { Title }
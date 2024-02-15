import React, { useContext } from "react";
import ReactDOM from 'react-dom';
import './ModalClass.css';
import { MoviesContext } from "../../context/MoviesContext";

function Modal({titulo, sbtFunction, id, children})
{
    const { setShowModal } = useContext(MoviesContext)

    const onSubmit = () =>
    {
        setShowModal(false)
        sbtFunction(id);
    }

    return ReactDOM.createPortal(
        <div className="modalBackground">
            <div className="container-modal">
                <div className="container-title">
                    <h4>{titulo}</h4>
                    <hr />
                </div>
                <div className="container-main">
                    {children}
                    <hr />
                </div>
                <div className="container-button">
                    <button className="btn btn-primary" onClick={() => setShowModal(false)}>Cerrar</button>
                    <button className="btn btn-success" onClick={onSubmit}>Confirmar</button>
                </div>
            </div>
            

        </div>
        , document.getElementById("modal")
    )
}

export { Modal }
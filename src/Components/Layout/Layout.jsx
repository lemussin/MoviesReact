import React from "react";
import './Layout.css';
import { Header } from "../Header/Header";

function Layout({ children })
{
    return(
        <div className="layout__body">
            <Header />
            <div>
                {children}
            </div>
        </div>
    )
}

export { Layout }
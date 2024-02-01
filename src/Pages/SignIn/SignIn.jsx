import React from "react";
import { Layout } from "../../Components/Layout/Layout";
import { SignInForm } from "../../Components/SignInForm/SignInForm";
import { Title } from "../../Components/Title/Title";
import './SignIn.css'

function SignIn()
{
    return(
        <Layout>
            <Title text='Sign In Movies'/>
            <div className="container-signin">
                <SignInForm />
            </div>
            
        </Layout>
    )
}

export { SignIn }